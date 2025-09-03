import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Add auth state change listener to handle token refresh errors
  client.auth.onAuthStateChange((event) => {
    if (event === "TOKEN_REFRESHED") {
      console.log("Token refreshed successfully");
    } else if (event === "SIGNED_OUT") {
      console.log("User signed out");
      // Clear local storage and session storage
      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
      }
    } else if (event === "SIGNED_IN") {
      console.log("User signed in successfully");
    }
  });

  return client;
}
