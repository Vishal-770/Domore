"use client";
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
import { Mail, MessageSquare, Phone, Clock } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContactPage() {
  const faqs = [
    {
      question: "How do I get started with Domore?",
      answer:
        "Simply sign up for a free account, and you’ll have access to all core features immediately. No credit card required for the trial period.",
    },
    {
      question: "Can I collaborate with my team?",
      answer:
        "Yes! Domore offers powerful collaboration features including shared projects, task assignments, and real-time updates for team members.",
    },
    {
      question: "Is my data secure with Domore?",
      answer:
        "Absolutely. We use bank-level encryption and follow industry best practices to ensure your data is always safe and private.",
    },
    {
      question: "Do you offer mobile apps?",
      answer:
        "Yes, Domore is available on iOS, Android, and as a web application, with full synchronization across all platforms.",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      main: "support@domore.com",
      sub: "We typically respond within 4 hours",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      main: "Available in-app",
      sub: "Monday - Friday, 9 AM - 6 PM PST",
    },
    {
      icon: Phone,
      title: "Phone Support",
      main: "+1 (555) 123-4567",
      sub: "For enterprise customers only",
    },
    {
      icon: Clock,
      title: "Support Hours",
      main: "Mon - Fri: 9 AM - 6 PM PST",
      sub: "Emergency support available 24/7",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-6xl text-center">
          <Badge variant="secondary" className="mb-6">
            Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            We&apos;re Here to{" "}
            <span className="text-primary">Help You Succeed</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Have questions about Domore? Need help getting started? Our team is
            ready to assist you in maximizing your productivity with our
            platform.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we&apos;ll get back to you within 24
                hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company (Optional)</Label>
                <Input id="company" placeholder="Acme Inc." />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help you?" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell us about your needs..."
                />
              </div>

              <Button size="lg" className="w-full">
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-muted-foreground text-lg">
                We&apos;re committed to providing exceptional support to help
                you make the most of Domore.
              </p>
            </div>

            {contactInfo.map((info, idx) => (
              <Card key={idx} className="p-6 border-0 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{info.title}</h3>
                    <p className="text-muted-foreground">{info.main}</p>
                    <p className="text-sm text-muted-foreground">{info.sub}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about Domore.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger className="text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
