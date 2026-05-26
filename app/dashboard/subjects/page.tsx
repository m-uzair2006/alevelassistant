import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header, Layout, Main } from "@/components/layout";
import { BookOpen, ChevronLeft } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { SUBJECTS } from "@/lib/constants/subjects";

export const dynamic = "force-dynamic";

export default async function SubjectsPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user?.email) {
    redirect("/auth");
  }

  const subjectList = SUBJECTS;

  return (
    <Layout>
      <Header className="flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Subject selection</p>
          <h1 className="text-2xl font-semibold">Choose a subject</h1>
        </div>

        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to dashboard
          </Button>
        </Link>
      </Header>

      <Main className="space-y-8">
        <section className="grid gap-6 xl:grid-cols-3">
          {subjectList.map((subject) => (
            <Card key={subject.code} className="overflow-hidden">
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                      Cambridge {subject.code}
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">{subject.name}</h2>
                  </div>
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{subject.description}</p>
              </div>
              <CardContent className="pt-0">
                <Button className="w-full">Start practice</Button>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="p-6 sm:p-8 bg-card/90">
          <CardHeader>
            <CardTitle>What to do next</CardTitle>
            <CardDescription>Start with a topic, submit an answer, or ask the AI to explain anything.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="rounded-3xl border border-border bg-background/80 p-5">
              <p className="text-sm font-semibold">Review command words first</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Use words like <span className="italic">explain</span>, <span className="italic">evaluate</span>, and <span className="italic">calculate</span> in your answers to match examiner expectations.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-background/80 p-5">
              <p className="text-sm font-semibold">Next step</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose a subject above and then use the dashboard to submit an answer or request AI feedback.
              </p>
            </div>
          </CardContent>
        </Card>
      </Main>
    </Layout>
  );
}
