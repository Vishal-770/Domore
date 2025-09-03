"use client";
import React, { useState } from "react";
import { signUp } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(event.currentTarget);
    const result = await signUp(formData);
    if (result.status === "success") {
      router.push("/login");
    } else {
      setError(result.status || "Sign up failed");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md sm:max-w-lg bg-white p-8 sm:p-10 rounded-lg shadow-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
          Create your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm sm:text-base">
              Username
            </Label>
            <Input
              type="text"
              placeholder="Enter your username"
              id="username"
              name="username"
              required
              disabled={loading}
              className="w-full h-10 sm:h-12 px-3 sm:px-4"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm sm:text-base">
              Email
            </Label>
            <Input
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
              required
              disabled={loading}
              className="w-full h-10 sm:h-12 px-3 sm:px-4"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm sm:text-base">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Create a password"
              id="password"
              name="password"
              required
              disabled={loading}
              className="w-full h-10 sm:h-12 px-3 sm:px-4"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full flex justify-center items-center h-10 sm:h-12 text-sm sm:text-base"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>

          {/* Error message */}
          {error && (
            <div className="flex items-center space-x-2 text-red-600 text-sm sm:text-base mt-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
