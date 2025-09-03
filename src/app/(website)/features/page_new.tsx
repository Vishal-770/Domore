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
  Calendar,
  BarChart3,
  Search,
  Shield,
  Timer,
  Tags,
  FileText,
  Filter,
  Bell,
  Smartphone,
  Palette,
  GitBranch,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function FeaturesPage() {
  const features = [
    {
      icon: CheckCircle,
      title: "Task Creation & Management",
      description:
        "Create tasks with rich descriptions, set due dates, and organize your work efficiently. Edit or delete tasks anytime from your dashboard.",
    },
    {
      icon: Target,
      title: "Three-Tier Priority System",
      description:
        "Organize tasks with High (red), Medium (yellow), and Low (green) priority levels. Focus on what matters most with color-coded priorities.",
    },
    {
      icon: Calendar,
      title: "Calendar View",
      description:
        "Visualize your tasks in a calendar format organized by due dates. Plan your schedule and see upcoming deadlines at a glance.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Track completion rates, productivity trends, task distribution by priority, and progress charts to understand your work patterns.",
    },
    {
      icon: Search,
      title: "Advanced Search & Filtering",
      description:
        "Find tasks quickly by title or description. Filter by status (pending/completed), priority level, or specific date ranges.",
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description:
        "Secure login with email/password or GitHub OAuth. Industry-standard encryption protects your data with row-level security.",
    },
    {
      icon: Timer,
      title: "Due Date Management",
      description:
        "Set and track task deadlines with visual indicators. Never miss important deadlines with clear due date management.",
    },
    {
      icon: Tags,
      title: "Status Tracking",
      description:
        "Mark tasks as pending or completed with simple checkboxes. Track your progress and see what's been accomplished.",
    },
    {
      icon: FileText,
      title: "Rich Task Descriptions",
      description:
        "Add detailed descriptions to your tasks. Provide context and notes to ensure nothing important is forgotten.",
    },
    {
      icon: Filter,
      title: "Smart Filtering Options",
      description:
        "Filter tasks by completion status, priority levels, or date ranges. Find exactly what you're looking for instantly.",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description:
        "Access your tasks from any device. Fully responsive design works seamlessly on desktop, tablet, and mobile.",
    },
    {
      icon: Palette,
      title: "Dark/Light Theme",
      description:
        "Choose between dark and light themes for comfortable viewing. Toggle themes to match your preference and environment.",
    },
    {
      icon: GitBranch,
      title: "Real-time Updates",
      description:
        "Changes sync instantly across all your devices. Real-time updates ensure your task list is always current.",
    },
    {
      icon: Bell,
      title: "Progress Tracking",
      description:
        "Monitor your productivity with completion metrics. See your progress over time and identify patterns in your work.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6">
              Powerful Features
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                Stay Organized
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Domore combines powerful task management features with an
              intuitive interface, giving you all the tools you need to organize
              your work and boost your productivity.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" asChild>
                <Link href="/register">Start Managing Tasks</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group rounded-lg h-full bg-background/50 backdrop-blur-sm">
                  <CardHeader className="space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose Domore?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with modern technologies and designed for productivity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Focused on Productivity
              </h3>
              <p className="text-muted-foreground">
                Every feature is designed to help you accomplish more with less
                effort.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your data is protected with enterprise-grade security and
                encryption.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Works Everywhere</h3>
              <p className="text-muted-foreground">
                Access your tasks from any device with our responsive design.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join users who have already revolutionized their workflow with
              Domore&apos;s comprehensive task management features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" asChild>
                  <Link href="/register">Get Started Free</Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
