import ResetPassword from "@/components/ResetPassword";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="w-full">
      <div className="mb-8 text-center lg:text-left">
        <h1 className="text-3xl font-bold tracking-tight">Set new password</h1>
        <p className="text-muted-foreground mt-2">
          Choose a strong password for your account
        </p>
      </div>

      <Card className="border-0 shadow-none lg:shadow-lg lg:border">
        <CardContent className="p-0 lg:p-6 space-y-6">
          <ResetPassword />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Back to sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
