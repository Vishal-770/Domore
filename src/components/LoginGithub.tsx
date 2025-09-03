"use client";

import { signInWithGithub } from "@/actions/auth";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Github, Loader2 } from "lucide-react";

const LoginGithub = () => {
  const [isPending, startTransition] = useTransition();

  const handleGithubLogin = () => {
    startTransition(async () => {
      await signInWithGithub();
    });
  };

  return (
    <Button
      onClick={handleGithubLogin}
      variant="outline"
      className="w-full"
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Redirecting...
        </>
      ) : (
        <>
          <Github className="mr-2 h-4 w-4" />
          Continue with GitHub
        </>
      )}
    </Button>
  );
};

export default LoginGithub;
