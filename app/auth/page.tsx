"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout, AuthCard, AuthVisualSection, OnboardingForm } from "@/components/auth";
import { Background } from "@/components/landing/Background";
import { useAuth } from "@/lib/auth";
import type { OnboardingFormData } from "@/components/auth";

export default function AuthPage() {
  const router = useRouter();
  const { session, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleOnboardingSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true);
    setError("");

    try {
      // Send onboarding data to API
      const response = await fetch("/api/auth/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to save profile. Please try again."
        );
      }

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="theme-landing relative flex min-h-screen items-center justify-center overflow-hidden bg-background text-foreground">
        <Background />
        <div className="relative z-10 text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-border border-t-accent" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthLayout
      visualSection={<AuthVisualSection />}
      authSection={
        <AuthCard
          step={session ? 2 : 1}
          totalSteps={2}
          title={session ? "Complete Your Profile" : "Join the Future of Learning"}
          description={
            session
              ? "Add your name and subjects to finish setting up your account"
              : "Set up your account in seconds"
          }
        >
          {error && (
            <div className="rounded-2xl border border-red-400/30 bg-red-500/12 p-3 text-sm text-red-100">
              {error}
            </div>
          )}
          <OnboardingForm
            onSubmit={handleOnboardingSubmit}
            isLoading={isSubmitting}
          />
        </AuthCard>
      }
    />
  );
}
