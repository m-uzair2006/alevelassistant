"use client";

import { motion } from "framer-motion";
import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
  step?: number;
  totalSteps?: number;
  title?: string;
  description?: string;
}

export function AuthCard({
  children,
  step = 1,
  totalSteps = 2,
  title = "Join the Future of Learning",
  description = "Set up your account in seconds",
}: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <div className="relative glass-strong w-full rounded-[28px] p-7 shadow-elegant transition-colors duration-300 sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="pointer-events-none absolute -inset-x-10 -top-10 h-36 rounded-full bg-gradient-brand opacity-15 blur-3xl">
        </div>

        <div className="mb-8">
          {totalSteps > 1 && (
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary/80">
                <motion.div
                  className="h-full bg-gradient-brand"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {step} of {totalSteps}
              </span>
            </div>
          )}

          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h2>
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        </div>

        <div className="space-y-6">{children}</div>

        <div className="absolute bottom-0 left-0 right-0 h-px rounded-b-[28px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 flex items-center justify-center gap-1 text-center text-xs text-muted-foreground"
      >
        <svg
          className="w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
        Your data is encrypted and secure
      </motion.div>
    </motion.div>
  );
}
