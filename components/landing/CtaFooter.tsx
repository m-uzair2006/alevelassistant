import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Cta() {
  return (
    <section id="cta" className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative glass-strong rounded-3xl overflow-hidden p-12 md:p-20 text-center shadow-elegant">
          <div className="absolute inset-0 bg-gradient-radial opacity-80" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-[600px] bg-gradient-brand opacity-30 blur-3xl rounded-full" />
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-medium tracking-[-0.03em] text-gradient leading-[1.05]">
              Start studying
              <br />
              <em className="not-italic text-gradient-brand" style={{ fontFamily: "'Instrument Serif', serif" }}>smarter today.</em>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md mx-auto">
              Join thousands of A Level students using AI Study OS to outwork, outthink and outperform.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/auth" className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-brand px-7 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-95 transition">
                <Sparkles className="h-4 w-4" />
                Start Studying Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/auth" className="inline-flex h-12 items-center rounded-full glass px-7 text-sm font-medium hover:bg-white/[0.04] transition">
                Continue with Google
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-md bg-gradient-brand" />
          <span className="text-foreground font-medium">AI Study OS</span>
          <span className="opacity-50">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}