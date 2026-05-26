import Link from "next/link";
import { ArrowRight, Clock3, LockKeyhole, Sparkles, Telescope } from "lucide-react";
import { AuthLayout, AuthVisualSection } from "@/components/auth";

export default function ComingSoonPage() {
  return (
    <AuthLayout
      visualSection={<AuthVisualSection />}
      authSection={
        <section className="w-full max-w-2xl space-y-6 py-6 lg:py-0">
          <div className="glass-strong overflow-hidden rounded-[32px] p-6 shadow-elegant sm:p-8">
            <div className="absolute" />
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-accent animate-pulse-glow" />
                <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Public preview
            </div>

            <div className="max-w-xl">
              <h1 className="text-3xl font-medium tracking-[-0.04em] text-gradient sm:text-4xl lg:text-5xl">
                Sign-in access is
                <br />
                <span
                  className="font-normal text-gradient-brand"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  coming soon.
                </span>
              </h1>
              <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
                `alevelassistant.vercel.app` is currently showcasing the product experience,
                visual system, and onboarding direction ahead of the full rollout.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass rounded-3xl p-5 sm:p-6">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-border bg-secondary/70">
                <Telescope className="h-5 w-5 text-foreground" />
              </div>
              <h2 className="text-base font-medium text-foreground">
                What you can explore now
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Browse the landing page, review the auth journey, and see the overall product
                design and messaging.
              </p>
            </div>

            <div className="glass rounded-3xl p-5 sm:p-6">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-border bg-secondary/70">
                <LockKeyhole className="h-5 w-5 text-foreground" />
              </div>
              <h2 className="text-base font-medium text-foreground">
                What is being finalized
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Google authentication, account provisioning, onboarding persistence, and dashboard
                access are being prepared for launch.
              </p>
            </div>
          </div>

          <div className="glass rounded-3xl p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-brand shadow-glow">
                <Clock3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Professional preview note</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  This page intentionally replaces live sign-in on the public deployment so visitors
                  see a stable, curated preview while the production-ready student experience is
                  completed.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border/80 bg-secondary/35 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">What happens next</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Once sign-in is enabled on the public deployment, visitors will be able to create
                  their profile, complete onboarding, and enter the full student workspace from the
                  same flow.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <Link
              href="/auth"
              className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-gradient-brand px-6 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
            >
              Back to auth
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full glass px-6 text-sm font-semibold text-foreground transition hover:bg-white/[0.08]"
            >
              View landing page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      }
    />
  );
}
