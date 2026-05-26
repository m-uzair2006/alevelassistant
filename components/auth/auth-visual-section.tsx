"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Brain, Target, Zap } from "lucide-react";

export function AuthVisualSection() {
  const features = [
    {
      icon: Brain,
      title: "Exam-aware tutoring",
      description: "Ask, solve and revise with AI that stays inside the Cambridge syllabus.",
    },
    {
      icon: Target,
      title: "Weak-topic focus",
      description: "Spot the gaps costing you marks and revise only what matters next.",
    },
    {
      icon: Zap,
      title: "Instant examiner feedback",
      description: "Get method marks, corrections and polished model answers in seconds.",
    },
    {
      icon: BookOpen,
      title: "Three subjects, one flow",
      description: "Physics 9702, Maths 9709 and Computer Science 9618 in one workspace.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="w-full max-w-xl text-foreground"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="mb-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-accent animate-pulse-glow" />
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Onboarding in under a minute
        </div>

        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand ">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-md font-semibold text-gradient-brand">
            ALevel Assistant
          </span>
        </div>

        <h1 className="text-4xl font-medium tracking-[-0.04em] text-gradient md:text-6xl">
          The same calm workspace,
          <br />
          <span
            className="font-normal text-gradient-brand"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            now for your account setup.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Sign in with Google, choose your subjects, and step straight into the same premium study experience as the landing page.
        </p>
      </motion.div>

    

      <motion.div
        variants={itemVariants}
        className="mt-10 glass rounded-3xl p-6"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Trusted by ambitious students
            </p>
            <p className="mt-2 text-lg font-medium text-foreground">
              Build your profile and start revising with AI immediately.
            </p>
          </div>
          <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-brand shadow-glow">
            <ArrowRight className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
