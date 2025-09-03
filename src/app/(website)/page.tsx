"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
  ArrowRight,
  ListTodo,
  Search,
  Clock,
} from "lucide-react";
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

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-1 flex items-center justify-center px-6 py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto">
          <motion.div
            className="flex flex-col items-center text-center space-y-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-6 px-4 py-2">
                Professional Task Management Platform
              </Badge>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl"
              variants={fadeInUp}
            >
              Master Your Tasks with{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Domore
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
              variants={fadeInUp}
            >
              The comprehensive task management solution that helps you
              organize, prioritize, and track your work with powerful analytics
              and intuitive design.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              variants={fadeInUp}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-primary to-primary/70 hover:from-primary/90 hover:to-primary/60"
                >
                  <Link href="/register">
                    Start Managing Tasks
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" asChild>
                  <Link href="/features">Explore Features</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Task Management Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to stay organized and productive in one
              elegant platform.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ListTodo className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Smart Task Organization</CardTitle>
                  <CardDescription>
                    Organize tasks with priorities, due dates, and custom
                    categories. Stay focused on what matters most.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Advanced Search & Filters</CardTitle>
                  <CardDescription>
                    Find any task instantly with powerful search and filtering
                    options. Filter by status, priority, or date range.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Productivity Analytics</CardTitle>
                  <CardDescription>
                    Track your progress with detailed analytics and insights.
                    Visualize completion rates and productivity trends.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Calendar Integration</CardTitle>
                  <CardDescription>
                    Visualize your tasks in a beautiful calendar view. Never
                    miss a deadline with smart scheduling.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Real-time Updates</CardTitle>
                  <CardDescription>
                    Instant synchronization across all devices. Your tasks are
                    always up-to-date wherever you are.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Goal Achievement</CardTitle>
                  <CardDescription>
                    Set and track your goals with completion metrics. Celebrate
                    your achievements and stay motivated.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Benefits List */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Boost Your Productivity Today
              </h2>
              <div className="space-y-4">
                {[
                  "Reduce task completion time by 40%",
                  "Never miss important deadlines again",
                  "Collaborate effectively with team members",
                  "Access your tasks anywhere, anytime",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call-to-Action Card */}
            <Card className="p-8 border-0 shadow-xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">
                  Ready to Get Started?
                </CardTitle>
                <CardDescription>
                  Join thousands of professionals who trust Domore with their
                  productivity.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button size="lg" className="w-full" asChild>
                  <Link href="/register">Create Free Account</Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full" asChild>
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
