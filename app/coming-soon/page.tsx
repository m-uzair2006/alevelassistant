import Link from "next/link";
import { ArrowRight, Clock3, LockKeyhole, Sparkles, Telescope } from "lucide-react";
import { AuthLayout, AuthCard, AuthVisualSection } from "@/components/auth";

export default function ComingSoonPage() {
  return (
    <AuthLayout
      visualSection={<AuthVisualSection />}
      authSection={
        <AuthCard
          title="Google Sign-In Is Coming Soon"
          description="This public preview is currently limited to the landing experience and polished auth flow. Secure sign-in and the full student workspace are being prepared for release."
          totalSteps={1}
        >
          <div className="glass rounded-3xl p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-brand shadow-glow">
                <Clock3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  Public preview
                </p>
                <p className="mt-1 text-sm leading-6 text-foreground">
                  `alevelassistant.vercel.app` is currently showcasing the product experience,
                  visual system, and onboarding direction ahead of the full rollout.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="glass rounded-3xl p-5">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-secondary/70 border border-border">
                <Telescope className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-base font-medium text-foreground">What you can explore now</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Browse the landing page, review the auth journey, and see the overall product
                design and messaging.
              </p>
            </div>

            <div className="glass rounded-3xl p-5">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-secondary/70 border border-border">
                <LockKeyhole className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-base font-medium text-foreground">What is being finalized</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Google authentication, account provisioning, onboarding persistence, and dashboard
                access are being prepared for launch.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border/80 bg-secondary/35 p-5">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 text-accent" />
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

          <div className="flex flex-col gap-3 sm:flex-row">
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
        </AuthCard>
      }
    />
  );
}
