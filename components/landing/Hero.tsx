import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-md">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-accent animate-pulse-glow" />
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Now training on the 2026 syllabus
        </div>

        <h1
          className="animate-fade-up mt-8 text-5xl md:text-7xl font-medium tracking-[-0.04em] text-gradient leading-[1.02]"
          style={{ animationDelay: "0.05s" }}
        >
          Next-Generation
          <br />
          <span className="font-[450]" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400 }}>
            A Level
          </span>{" "}
          Learning.
        </h1>

        <p
          className="animate-fade-up mx-auto mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
          style={{ animationDelay: "0.15s" }}
        >
          An AI operating system built for ambitious students. Examiner-grade marking,
          weak-topic detection, and syllabus-aware tutoring — in one calm workspace.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{ animationDelay: "0.25s" }}
        >
          <Link
            href="/auth"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-gradient-brand px-6 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-95 transition"
          >
            <Sparkles className="h-4 w-4" />
            Start Studying Free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="#demo"
            className="inline-flex h-11 items-center gap-2 rounded-full glass px-6 text-sm font-medium hover:bg-white/[0.04] transition"
          >
            <Play className="h-4 w-4" />
            Watch the AI Demo
          </a>
        </div>

        <div
          className="animate-fade-up relative mt-20 mx-auto max-w-5xl"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="absolute -inset-x-10 -top-10 -bottom-10 bg-gradient-brand opacity-20 blur-3xl rounded-full" />
          <div className="relative glass-strong rounded-2xl p-2 shadow-elegant">
            <Image
              src="/hero-mockup.jpg"
              alt="AI Study OS dashboard preview"
              width={1600}
              height={1200}
              priority
              sizes="(min-width: 1280px) 960px, (min-width: 768px) 80vw, 100vw"
              className="h-auto w-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}