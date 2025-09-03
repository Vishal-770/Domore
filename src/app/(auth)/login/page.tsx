import ActualLoginForm from "@/components/ActualLoginForm";
import LoginGithub from "@/components/LoginGithub";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const LoginPage = async () => {
  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:text-left">
        <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-muted-foreground mt-2">
          Sign in to your Domore account to continue your productivity journey
        </p>
      </div>

      <Card className="border-0 shadow-none lg:shadow-lg lg:border">
        <CardContent className="p-0 lg:p-6 space-y-6">
          <ActualLoginForm />

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
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:underline"
              >
                Sign up instead
              </Link>
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Forgot your password?{" "}
              <Link
                href="/forgot-password"
                className="font-medium text-primary hover:underline"
              >
                Reset it here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
