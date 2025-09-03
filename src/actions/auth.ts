"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const credentials = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Validate input
  if (!credentials.email || !credentials.password || !credentials.username) {
    return {
      status: "error",
      message: "All fields are required",
      user: null,
    };
  }

  if (credentials.password.length < 6) {
    return {
      status: "error",
      message: "Password must be at least 6 characters long",
      user: null,
    };
  }

  const { error, data } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        username: credentials.username,
      },
    },
  });

  if (error) {
    // Handle specific error types
    if (error.message.includes("Invalid email")) {
      return {
        status: "error",
        message: "Please enter a valid email address",
        user: null,
      };
    }
    if (error.message.includes("Password")) {
      return {
        status: "error",
        message: "Password is too weak. Please use a stronger password",
        user: null,
      };
    }
    return {
      status: "error",
      message: error.message,
      user: null,
    };
  } else if (data?.user?.identities?.length === 0) {
    return {
      status: "error",
      message:
        "An account with this email already exists. Please sign in instead",
      user: null,
    };
  }

  revalidatePath("/", "layout");
  return {
    status: "success",
    message:
      "Account created successfully! Please check your email to verify your account",
    user: data.user,
  };
}
export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Validate input
  if (!credentials.email || !credentials.password) {
    return {
      status: "error",
      message: "Email and password are required",
      user: null,
    };
  }

  const { error, data } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    // Handle specific error types
    if (error.message.includes("Invalid login credentials")) {
      return {
        status: "error",
        message:
          "Invalid email or password. Please check your credentials and try again",
        user: null,
      };
    }
    if (error.message.includes("Email not confirmed")) {
      return {
        status: "error",
        message:
          "Please check your email and click the confirmation link before signing in",
        user: null,
      };
    }
    if (error.message.includes("Invalid email")) {
      return {
        status: "error",
        message: "Please enter a valid email address",
        user: null,
      };
    }
    return {
      status: "error",
      message: error.message,
      user: null,
    };
  }

  // Create user profile if it doesn't exist
  const { data: existingUser } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", credentials?.email)
    .limit(1)
    .single();

  if (!existingUser) {
    const { error: insertError } = await supabase.from("user_profiles").insert({
      email: data?.user.email,
      username: data?.user?.user_metadata?.username,
    });
    if (insertError) {
      return {
        status: "error",
        message: "Failed to create user profile. Please try again",
        user: null,
      };
    }
  }

  revalidatePath("/", "layout");
  return {
    status: "success",
    message: "Successfully signed in! Welcome back",
    user: data.user,
  };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out error:", error);
    redirect("/error");
  }

  // Clear all cached data and revalidate
  revalidatePath("/", "layout");
  revalidatePath("/dashboard", "layout");
  revalidatePath("/login", "page");

  redirect("/login");
}
export async function getUserSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    return null;
  }
  return {
    status: "success",
    user: data?.session?.user,
  };
}
export async function signInWithGithub() {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
  if (error) {
    redirect("/error");
  } else if (data.url) {
    return redirect(data.url);
  }
}
export async function forgotPassword(formData: FormData) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const email = formData.get("email") as string;

  if (!email) {
    return {
      status: "error",
      message: "Email address is required",
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`,
  });

  if (error) {
    if (error.message.includes("Invalid email")) {
      return {
        status: "error",
        message: "Please enter a valid email address",
      };
    }
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
    message: "Password reset email sent! Please check your inbox",
  };
}

export async function resetPassword(formData: FormData, code: string) {
  const supabase = await createClient();
  const password = formData.get("password") as string;

  if (!password) {
    return {
      status: "error",
      message: "Password is required",
    };
  }

  if (password.length < 6) {
    return {
      status: "error",
      message: "Password must be at least 6 characters long",
    };
  }

  const { error: codeError } = await supabase.auth.exchangeCodeForSession(code);

  if (codeError) {
    return {
      status: "error",
      message:
        "Invalid or expired reset link. Please request a new password reset",
    };
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
    message:
      "Password updated successfully! You can now sign in with your new password",
  };
}
