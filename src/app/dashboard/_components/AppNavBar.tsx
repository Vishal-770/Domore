"use client";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

const AppNavBar = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          // Only log significant errors, not session missing errors
          if (!error.message.includes("Auth session missing")) {
            console.error("Error fetching user:", error);
          }

          // If it's a refresh token error, redirect to login
          if (
            error.message?.includes("refresh_token_not_found") ||
            error.message?.includes("Invalid Refresh Token")
          ) {
            router.push("/login?error=session_expired");
            return;
          }
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.debug(
          "Auth error in AppNavBar (expected when not logged in):",
          error
        );
        // Only redirect on serious errors, not missing sessions
        if (error instanceof Error && !error.message.includes("session")) {
          router.push("/login?error=auth_error");
        }
      }
    };

    getUser();

    // Set up auth state listener
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
        toast.info("You have been signed out");
        // Force refresh to clear all cached data
        window.location.href = "/login";
      } else if (session?.user) {
        setUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      toast.loading("Signing out...");

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Successfully signed out!");

        // Clear user state immediately
        setUser(null);

        // Navigate to login page
        router.push("/login");

        // Force a page refresh to clear all cached data
        setTimeout(() => {
          window.location.href = "/login";
        }, 100);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to sign out");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred while signing out");
    }
  };

  // Get user's first letter for fallback
  const getUserInitial = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold text-foreground hover:text-primary transition-colors"
        >
          Task Dashboard
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                {user?.user_metadata?.avatar_url && (
                  <AvatarImage
                    src={user.user_metadata.avatar_url}
                    alt={user.email || "User avatar"}
                  />
                )}
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {getUserInitial()}
                </AvatarFallback>
              </Avatar>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{user?.email || "My Account"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.nav>
  );
};

export default AppNavBar;
