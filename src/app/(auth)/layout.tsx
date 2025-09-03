import { getUserSession } from "@/actions/auth";
import { redirect } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Zap, Target, Shield } from "lucide-react";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await getUserSession();
  if (response?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Information */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-primary text-primary-foreground p-12">
        {/* Top: Back + Theme Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-primary-foreground "
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
          <h1 className="text-4xl font-bold mb-4 text-primary-foreground">
            Welcome to Domore
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            The professional task management platform that transforms how you
            organize and accomplish your goals.
          </p>

          {/* Features */}
          <div className="space-y-6">
            {[
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
                description:
                  "Your data is protected with enterprise-grade security.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className="bg-secondary p-2 rounded-lg flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-primary-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Branding */}
        <div className="text-center text-muted-foreground mt-8">
          <p>
            &copy; 2025 Domore. Built for professionals who value excellence.
          </p>
        </div>
      </div>

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
