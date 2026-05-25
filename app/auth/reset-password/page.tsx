"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";

function parseRecoverParams() {
  if (typeof window === "undefined") {
    return null;
  }

  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get("access_token") || searchParams.get("refresh_token")) {
    return true;
  }

  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  return !!(hashParams.get("access_token") || hashParams.get("refresh_token"));
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const { supabase } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      if (!supabase) {
        return;
      }

      const recoveryParams = parseRecoverParams();
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setHasRecoverySession(true);
      } else if (recoveryParams) {
        // The Supabase client will attempt to detect the session from the URL automatically.
        setHasRecoverySession(true);
      }

      setLoaded(true);
    };

    verifySession();
  }, [supabase]);

  const handleReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsProcessing(true);

    const { data, error } = await supabase.auth.updateUser({ password });
    setIsProcessing(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.user) {
      setSuccess("Your password has been updated.");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1400);
    }
  };

  const canSubmit = password.trim().length > 0 && confirmPassword.trim().length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Reset password</CardTitle>
          <CardDescription>
            Choose a new password for your account and sign in again.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {!loaded ? (
            <p className="text-sm text-muted-foreground">Checking your reset session...</p>
          ) : !hasRecoverySession ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                We couldn&apos;t verify your recovery session. Please request a new password reset
                link.
              </p>
              <Link href="/auth/forgot-password">
                <Button className="w-full">Send new reset link</Button>
              </Link>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleReset}>
              <div className="space-y-2">
                <label className="text-sm font-medium">New password</label>
                <Input
                  type="password"
                  placeholder="Create a new password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm password</label>
                <Input
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>

              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              {success ? <p className="text-sm text-primary">{success}</p> : null}

              <Button type="submit" className="w-full" disabled={isProcessing || !canSubmit}>
                {isProcessing ? "Updating password..." : "Update password"}
              </Button>
            </form>
          )}

          <p className="text-sm text-center text-muted-foreground">
            Remembered your password?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
