"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Zap, Target, Shield } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [router, supabase.auth]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const features = [
    {
      icon: CheckCircle,
      title: "Smart Organization",
      description:
        "Organize tasks with intelligent categorization and priority management.",
    },
    {
      icon: Zap,
      title: "Boost Productivity",
      description:
        "Advanced features designed to maximize your daily productivity.",
    },
    {
      icon: Target,
      title: "Goal Achievement",
      description:
        "Track progress and achieve your objectives with clear insights.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security.",
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Information */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-b from-primary via-primary/90 to-primary/80 text-primary-foreground p-12"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Top: Back + Theme Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center mt-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Domore</h1>
          <p className="text-lg text-primary-foreground/90 mb-8">
            The professional task management platform that transforms how you
            organize and accomplish your goals.
          </p>

          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className="bg-primary-foreground/20 p-2 rounded-lg flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-primary-foreground/90">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Branding */}
        <div className="text-center text-primary-foreground/70 mt-8">
          <p>
            &copy; 2025 Domore. Built for professionals who value excellence.
          </p>
        </div>
      </motion.div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-background text-foreground">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <ThemeToggle />
        </div>

        {/* Form content */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">{children}</div>
        </div>

        {/* Mobile Branding */}
        <div className="lg:hidden p-4 text-center border-t border-border bg-muted">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 Domore. Built for professionals.
          </p>
        </div>
      </div>
    </div>
  );
}
