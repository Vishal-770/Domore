"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  MessageSquare,
  Clock,
  HelpCircle,
  Phone,
  MapPin,
  Send,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const faqs = [
    {
      question: "How do I create and manage tasks?",
      answer:
        "Creating tasks is simple! Click the 'New Task' button, add a title and description, set a priority level, and choose a due date. You can edit or delete tasks anytime from your dashboard.",
    },
    {
      question: "How does the priority system work?",
      answer:
        "Domore uses a three-tier priority system: High (red), Medium (yellow), and Low (green). You can filter and sort tasks by priority to focus on what matters most.",
    },
    {
      question: "Can I view my tasks in a calendar format?",
      answer:
        "Yes! Domore includes a calendar view where you can see all your tasks organized by their due dates, making it easy to plan your schedule.",
    },
    {
      question: "What analytics features are available?",
      answer:
        "Our analytics dashboard shows completion rates, productivity trends, task distribution by priority, and progress charts to help you understand your productivity patterns.",
    },
    {
      question: "How do I search for specific tasks?",
      answer:
        "Use the search bar to find tasks by title or description. You can also filter tasks by status (pending/completed), priority level, or specific date ranges.",
    },
    {
      question: "Is my task data secure?",
      answer:
        "Absolutely. We use industry-standard encryption and secure authentication to protect your data. Your tasks are stored safely and only accessible to you.",
    },
    {
      question: "Can I export my tasks?",
      answer:
        "Currently, you can view and manage all your tasks within the platform. We're working on export features for future updates.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you instructions to reset your password.",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      main: "support@domore.com",
      sub: "Get help with your tasks and features",
    },
    {
      icon: MessageSquare,
      title: "Feature Requests",
      main: "feedback@domore.com",
      sub: "Suggest new features and improvements",
    },
    {
      icon: Clock,
      title: "Response Time",
      main: "Within 24 hours",
      sub: "We respond to all inquiries promptly",
    },
    {
      icon: Phone,
      title: "Phone Support",
      main: "+1 (555) 123-4567",
      sub: "Monday - Friday, 9 AM - 5 PM EST",
    },
    {
      icon: MapPin,
      title: "Office Location",
      main: "123 Productivity Lane",
      sub: "San Francisco, CA 94102",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We&apos;re here to help you get the most out of Domore. Whether
              you have questions about features or need assistance, we&apos;d
              love to hear from you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6">
                <CardHeader className="px-0 pt-0 pb-4">
                  <CardTitle className="text-xl mb-2 flex items-center gap-2">
                    <Send className="h-5 w-5 text-primary" />
                    Send us a message
                  </CardTitle>
                  <CardDescription>
                    Have a question or feedback? We&apos;d love to hear from
                    you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName" className="text-sm">
                          First name *
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Enter your first name"
                          required
                          className="h-9"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="lastName" className="text-sm">
                          Last name *
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Enter your last name"
                          required
                          className="h-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject" className="text-sm">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this about?"
                        required
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-sm">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your question or feedback..."
                        className="min-h-[100px] resize-none"
                        required
                      />
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button type="submit" className="w-full h-10" size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-3"
              >
                <h2 className="text-xl font-bold mb-4">Get in touch</h2>
                <div className="space-y-3">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={fadeInUp}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="p-3 hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-3">
                            <div className="bg-primary/10 rounded-lg p-1.5">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm">
                                {info.title}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                {info.main}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {info.sub}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-bold">
                      Frequently Asked Questions
                    </h2>
                  </div>
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-1"
                  >
                    {faqs.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-b-0"
                      >
                        <AccordionTrigger className="text-left text-sm py-3 hover:no-underline">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground pb-3">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
