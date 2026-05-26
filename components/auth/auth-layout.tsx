"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import { Brain } from "lucide-react";
import { Background } from "@/components/landing/Background";

interface AuthLayoutProps {
  visualSection: React.ReactNode;
  authSection: React.ReactNode;
}

export function AuthLayout({ visualSection, authSection }: AuthLayoutProps) {
  return (
    <div className="theme-landing relative min-h-dvh overflow-hidden bg-background text-foreground">
      <Background />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-3 text-sm font-medium tracking-tight text-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-glow">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </span>
          <span>ALevel Assistant</span>
        </Link>
        <Link
          href="/"
          className="hidden rounded-full border border-border/80 bg-white/[0.04] px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
        >
          Back to home
        </Link>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-brand opacity-20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-gradient-brand opacity-20 blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(114,145,255,0.18),transparent_65%)] blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-88px)] w-full max-w-6xl items-center px-4 pb-6 pt-4 sm:px-6 lg:px-8">
        <div className="hidden max-h-full overflow-hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:pr-10">
          {visualSection}
        </div>

        <div className="flex w-full items-center justify-center lg:w-1/2 lg:justify-end">
          {authSection}
        </div>
      </div>

      <div className="absolute inset-0 lg:hidden pointer-events-none">
        <motion.div
          className="absolute left-1/2 top-12 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-2xl"
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
