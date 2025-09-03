"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Target,
  Users,
  Zap,
  Calendar,
  Bell,
  Smartphone,
  Shield,
  BarChart3,
  Tags,
  Timer,
  Search,
} from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  const features = [
    {
      icon: Target,
      title: "Smart Task Organization",
      description:
        "Automatically categorize and prioritize your tasks with intelligent algorithms that learn from your behavior.",
    },
    {
      icon: Calendar,
      title: "Advanced Scheduling",
      description:
        "Schedule tasks with flexible date and time options, recurring tasks, and deadline reminders.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Share projects, assign tasks to team members, and track progress in real-time.",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description:
        "Get contextual notifications that help you stay on track without overwhelming you.",
    },
    {
      icon: Smartphone,
      title: "Cross-Platform Sync",
      description:
        "Access your tasks seamlessly across desktop, mobile, and web with real-time synchronization.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level encryption and security measures to keep your data safe and private.",
    },
    {
      icon: BarChart3,
      title: "Productivity Analytics",
      description:
        "Track your productivity patterns and get insights to optimize your workflow.",
    },
    {
      icon: Tags,
      title: "Flexible Tagging",
      description:
        "Organize tasks with custom tags and labels for powerful filtering and search capabilities.",
    },
    {
      icon: Timer,
      title: "Time Tracking",
      description:
        "Built-in time tracking to monitor how long tasks take and improve your estimates.",
    },
    {
      icon: Search,
      title: "Powerful Search",
      description:
        "Find any task instantly with advanced search filters and natural language queries.",
    },
    {
      icon: Zap,
      title: "Quick Capture",
      description:
        "Add tasks instantly with keyboard shortcuts, voice input, and smart parsing.",
    },
    {
      icon: CheckCircle,
      title: "Goal Tracking",
      description:
        "Set and track long-term goals with milestone tracking and progress visualization.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-6xl text-center">
          <Badge variant="secondary" className="mb-6">
            Comprehensive Features
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Everything You Need to{" "}
            <span className="text-primary">Stay Productive</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Domore combines powerful task management features with an intuitive
            interface, giving you all the tools you need to organize your work
            and achieve your goals.
          </p>
          <Button size="lg" asChild>
            <Link href="/register">Try All Features Free</Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group rounded-lg"
              >
                <CardHeader className="space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals who have already revolutionized
            their workflow with Domore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
