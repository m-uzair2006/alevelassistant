"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GoogleButton } from "./google-button";
import { Check } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { SUBJECTS } from "@/lib/constants/subjects";
import type { Subject } from "@/lib/types";
export interface OnboardingFormData {
  fullName: string;
  subjects: Subject[];
}

interface OnboardingFormProps {
  onSubmit: (data: OnboardingFormData) => void;
  isLoading?: boolean;
}

export function OnboardingForm({ onSubmit, isLoading }: OnboardingFormProps) {
  const { signInWithGoogle, session } = useAuth();
  const [formData, setFormData] = useState<OnboardingFormData>({
    fullName: session?.user?.user_metadata?.full_name ?? "",
    subjects: [],
  });
  const [googleLoading, setGoogleLoading] = useState(false);
  const currentStep = session ? "details" : "google";

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign-in error:", error);
      setGoogleLoading(false);
    }
  };

  const handleSubjectToggle = (subject: Subject) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid =
    formData.fullName.trim().length > 0 &&
    formData.subjects.length > 0;

  if (currentStep === "google") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6"
      >
        <GoogleButton
          onClick={handleGoogleSignIn}
          isLoading={googleLoading}
        />

        <div className="relative flex flex-col gap-3">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="rounded-2xl border border-border/80 bg-secondary/35 px-4 py-3 text-sm text-muted-foreground">
            Then add your full name and choose the subjects you want to study.
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="mb-2 block text-sm font-medium text-foreground">
          Full Name
        </label>
        <Input
          type="text"
          placeholder={
           "Enter Your Full Name"
          }
          value={formData.fullName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, fullName: e.target.value }))
          }
          className="h-12 rounded-2xl border-border/80 bg-secondary/35 text-foreground placeholder:text-muted-foreground"
          required
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <label className="mb-3 block text-sm font-medium text-foreground">
          Subjects
        </label>
        <div className="grid grid-cols-2 gap-2">
          {SUBJECTS.map((subject) => (
            <button
              key={subject.value}
              type="button"
              onClick={() => handleSubjectToggle(subject.value)}
              className={`relative group p-3 rounded-lg border-2 transition-all duration-200 ${
                formData.subjects.includes(subject.value)
                  ? "border-transparent bg-gradient-brand text-primary-foreground shadow-glow"
                  : "border-border/80 bg-secondary/30 hover:border-white/25 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {subject.name}
                </span>
                {formData.subjects.includes(subject.value) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </motion.div>
                )}
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="h-12 w-full rounded-full bg-gradient-brand py-3 font-semibold text-primary-foreground shadow-glow transition-all duration-200 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Setting up your account..." : "Start Learning"}
        </Button>
      </motion.div>
    </form>
  );
}
