import SignUpForm from "@/components/SignUpForm";
import LoginGithub from "@/components/LoginGithub";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SignUp = async () => {
  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:text-left">
        <h1 className="text-3xl font-bold tracking-tight">
          Create your account
        </h1>
        <p className="text-muted-foreground mt-2">
          Join thousands of professionals who trust Domore to boost their
          productivity
        </p>
      </div>

      <Card className="border-0 shadow-none lg:shadow-lg lg:border">
        <CardContent className="p-0 lg:p-6 space-y-6">
          <SignUpForm />

          {/* Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* GitHub Login */}
          <LoginGithub />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in instead
              </Link>
            </p>
          </div>

          <div className="text-xs text-center text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="#" className="underline hover:text-primary">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-primary">
              Privacy Policy
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
