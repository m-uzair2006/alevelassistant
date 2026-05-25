import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";

export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header, Layout, Main } from "@/components/layout";
import { Activity, BarChart3, Sparkles, Zap, Settings, User } from "lucide-react";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { SUBJECTS } from "@/lib/constants/subjects";
import type { Subject } from "@/lib/types";

function mapCookieList(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return cookieStore.getAll().map((cookie) => ({
    name: cookie.name,
    value: cookie.value,
  }));
}

async function buildSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local",
    );
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: async () => mapCookieList(cookieStore),
      setAll: async () => {
        // no-op for the dashboard render; session lifetimes are managed elsewhere.
      },
    },
  });
}

export default async function DashboardPage() {
  const supabase = await buildSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.email) {
    redirect("/auth/login");
  }

  const userId = session.user.id;
  const profileQuery = await supabase.from("user_profiles").select("full_name").eq("id", userId).single();
  const answersQuery = await supabase
    .from("answers")
    .select("id,subject,question_text,created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(3);
  const preferencesQuery = await supabase
    .from("user_subject_preferences")
    .select("subject")
    .eq("user_id", userId);

  const displayName = profileQuery.data?.full_name ?? session.user.email;
  const recentAnswers = answersQuery.data ?? [];
  const selectedSubjects = (preferencesQuery.data ?? []).map((item) => item.subject as Subject);
  const subjectCards = Object.values(SUBJECTS);

  return (
    <Layout>
      <Header className="flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Dashboard</p>
          <h1 className="text-2xl font-semibold">Study workspace</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/dashboard/profile" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5">
            <User className="h-4 w-4" />
            Profile
          </Link>
          <Link href="/dashboard/subjects" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5">
            <Settings className="h-4 w-4" />
            Subjects
          </Link>
          <SignOutButton />
        </div>
      </Header>

      <Main className="space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <Card className="overflow-hidden bg-card/90">
            <div className="p-8 sm:p-10">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Welcome back</p>
                  <h2 className="mt-3 text-3xl font-semibold">{displayName}</h2>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                Your AI-enabled A Level study dashboard is ready. Track performance, review recent activity,
                and take quick actions for smarter revision.
              </p>
            </div>
          </Card>

          <Card className="grid gap-4 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Answers Submitted</p>
                <p className="mt-2 text-3xl font-semibold">{recentAnswers.length}</p>
              </div>
              <Zap className="h-7 w-7 text-yellow-300" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="mt-2 text-3xl font-semibold">--</p>
              </div>
              <BarChart3 className="h-7 w-7 text-cyan-300" />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Weak Topics</p>
                <p className="mt-2 text-3xl font-semibold">--</p>
              </div>
              <Activity className="h-7 w-7 text-violet-300" />
            </div>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="p-6 sm:p-8">
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription>Ready for the next step in your revision routine.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Link href="/dashboard/profile">
                <Button className="w-full">Update profile</Button>
              </Link>
              <Link href="/dashboard/subjects">
                <Button variant="outline" className="w-full">
                  Explore subjects
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="p-6 sm:p-8">
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>Track your latest study tasks and sample answers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAnswers.length > 0 ? (
                recentAnswers.map((answer) => {
                  const subjectName = SUBJECTS[answer.subject as Subject]?.name ?? answer.subject;
                  const submittedDate = new Date(answer.created_at).toLocaleDateString();

                  return (
                    <div key={answer.id} className="rounded-3xl border border-border bg-background/80 p-4">
                      <p className="text-sm font-semibold">{subjectName}</p>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{answer.question_text}</p>
                      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">{submittedDate}</p>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-background/50 p-7 text-center">
                  <p className="text-sm font-medium">No recent activity yet</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add a practice answer or start a study session to see your recent work here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-6 sm:p-8">
            <CardHeader>
              <CardTitle>Selected subjects</CardTitle>
              <CardDescription>Study preferences you have chosen.</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedSubjects.length > 0 ? (
                <div className="grid gap-3">
                  {selectedSubjects.map((subject) => (
                    <div key={subject} className="rounded-2xl border border-border p-4">
                      <p className="font-medium">{SUBJECTS[subject]?.name ?? subject}</p>
                      <p className="text-sm text-muted-foreground">{SUBJECTS[subject]?.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-background/50 p-7 text-center">
                  <p className="text-sm font-medium">No subjects selected</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Complete your profile to choose the subjects you want to study.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="overflow-hidden bg-card/90 p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-accent/10 p-3 text-accent">
                <Settings className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Study tip</p>
                <p className="mt-2 text-lg font-semibold">Keep your account details current</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Updating your profile and preferences helps the system recommend the right A Level content.
            </p>
          </Card>
        </section>
      </Main>
    </Layout>
  );
}
