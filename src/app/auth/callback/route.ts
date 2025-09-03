import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL, default to dashboard
  let next = searchParams.get("next") ?? "/dashboard";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/dashboard";
  }

  if (code) {
    const supabase = await createClient();
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        const { data, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.error("Error fetching user data:", userError.message);
          return NextResponse.redirect(`${origin}/error`);
        }

        const { data: existingUser } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("email", data?.user?.email)
          .limit(1)
          .single();

        if (!existingUser) {
          const { error: insertError } = await supabase
            .from("user_profiles")
            .insert({
              email: data?.user.email,
              username: data?.user?.user_metadata?.username,
            });

          if (insertError) {
            console.error("Error Inserting Users", insertError.message);
            return NextResponse.redirect(`${origin}/error`);
          }
        }

        const forwardedHost = request.headers.get("x-forwarded-host");
        const isLocalEnv = process.env.NODE_ENV === "development";
        if (isLocalEnv) {
          return NextResponse.redirect(`${origin}${next}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`);
        } else {
          return NextResponse.redirect(`${origin}${next}`);
        }
      } else {
        console.error("Error exchanging code for session:", error.message);
        return NextResponse.redirect(`${origin}/login?error=auth_error`);
      }
    } catch (authError: unknown) {
      const error = authError as { message?: string; code?: string };
      console.error("Auth callback error:", error.message);
      // Clear any invalid tokens and redirect to login
      const response = NextResponse.redirect(
        `${origin}/login?error=session_expired`
      );
      response.cookies.set("sb-access-token", "", { maxAge: 0 });
      response.cookies.set("sb-refresh-token", "", { maxAge: 0 });
      return response;
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
