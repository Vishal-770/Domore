import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";
import { UserAvatar } from "@/components/UserAvatar";

const Navbar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Domore
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/features"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right side - Auth & Theme */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-2">
              {!user ? (
                <>
                  <Button variant="ghost" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </>
              ) : (
                <UserAvatar user={user} />
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-4">
                    <Link
                      href="/dashboard"
                      className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/features"
                      className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      Features
                    </Link>
                    <Link
                      href="/contact"
                      className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      Contact
                    </Link>
                  </div>

                  {/* Mobile Auth */}
                  <div className="border-t pt-6">
                    {!user ? (
                      <div className="flex flex-col space-y-3">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          asChild
                        >
                          <Link href="/login">Sign In</Link>
                        </Button>
                        <Button className="w-full justify-start" asChild>
                          <Link href="/register">Sign Up</Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                          <UserAvatar user={user} />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {user.user_metadata?.full_name || user.email}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {user.email}
                            </div>
                          </div>
                        </div>
                        <form action="/api/auth/logout" method="post">
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            type="submit"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                          </Button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
