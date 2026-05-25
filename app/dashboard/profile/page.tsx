import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header, Layout, Main } from "@/components/layout";
import { Settings, User } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/dashboard/profile-form";
import type { Subject, UserProfile } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const userId = session.user.id;

  const profileResult = await supabase
    .from("user_profiles")
    .select("id, email, full_name, created_at, updated_at")
    .eq("id", userId)
    .single();

  const profileData = profileResult.data as UserProfile | null;

  const { data: preferences } = await supabase
    .from("user_subject_preferences")
    .select("subject")
    .eq("user_id", userId);

  const activeSubjects = (preferences ?? []).map((item) => item.subject as Subject);

  return (
    <Layout>
      <Header className="flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Profile settings</p>
          <h1 className="text-2xl font-semibold">Your account</h1>
        </div>

        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-primary" />
          <Link href="/dashboard" className="text-sm font-medium text-primary hover:underline">
            Back to dashboard
          </Link>
        </div>
      </Header>

      <Main className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
          <ProfileForm profile={profileData ?? null} activeSubjects={activeSubjects} />

          <Card className="p-6 sm:p-8 bg-card/90">
            <CardHeader>
              <CardTitle>Account overview</CardTitle>
              <CardDescription>Manage your profile and study preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Signed in as</p>
                <p className="mt-2 text-base font-medium">{session.user.email}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Connected provider</p>
                <p className="mt-2 text-base font-medium">{session.user.app_metadata?.provider ?? "email/password"}</p>
              </div>
              <div className="rounded-3xl border border-border bg-background/70 p-4">
                <p className="text-sm font-semibold">Tip</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Keep your profile up to date so the dashboard can personalize your study plan.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </Main>
    </Layout>
  );
}
