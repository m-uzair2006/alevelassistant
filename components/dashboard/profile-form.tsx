"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Subject, UserProfile } from "@/lib/types";
import { getBrowserSupabaseClient } from "@/lib/supabase/client";
import { SUBJECTS } from "@/lib/constants/subjects";

type ProfileFormProps = {
  profile: UserProfile | null;
  activeSubjects: Subject[];
};

export function ProfileForm({ profile, activeSubjects }: ProfileFormProps) {
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>(activeSubjects ?? []);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const subjectEntries = useMemo(
    () => Object.entries(SUBJECTS) as [Subject, { name: string; code: string; description: string }][],
    [],
  );

  const supabase = getBrowserSupabaseClient();

  const handleToggleSubject = (subject: Subject) => {
    setSelectedSubjects((current) =>
      current.includes(subject)
        ? current.filter((item) => item !== subject)
        : [...current, subject],
    );
  };

  const handleSave = async () => {
    if (!supabase) {
      setError("Cannot connect to Supabase in the browser.");
      return;
    }

    setError("");
    setMessage("");
    setIsSaving(true);

    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData.session?.user) {
      setIsSaving(false);
      setError("Unable to verify your session. Please sign in again.");
      return;
    }

    const user = sessionData.session.user;

    const { error: profileError } = await supabase.from("user_profiles").upsert({
      id: user.id,
      email: user.email,
      full_name: fullName || null,
    });

    if (profileError) {
      setIsSaving(false);
      setError(profileError.message);
      return;
    }

    if (selectedSubjects.length > 0) {
      const preferences = selectedSubjects.map((subject) => ({
        user_id: user.id,
        subject,
      }));

      const { error: prefError } = await supabase.from("user_subject_preferences").upsert(preferences, {
        onConflict: "user_id,subject",
      });

      if (prefError) {
        setIsSaving(false);
        setError(prefError.message);
        return;
      }
    }

    const { error: authError } = await supabase.auth.updateUser({ data: { full_name: fullName || undefined } });
    if (authError) {
      setIsSaving(false);
      setError(authError.message);
      return;
    }

    setIsSaving(false);
    setMessage("Your profile was saved successfully.");
  };

  return (
    <Card className="space-y-6 bg-card/90 p-6 sm:p-8">
      <CardHeader>
        <CardTitle>Profile setup</CardTitle>
        <CardDescription>Save your name and study subject preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium">Full name</label>
          <Input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium">Preferred subjects</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {subjectEntries.map(([subject, meta]) => (
              <button
                key={subject}
                type="button"
                onClick={() => handleToggleSubject(subject)}
                className={`rounded-2xl border p-4 text-left transition hover:border-primary ${
                  selectedSubjects.includes(subject)
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background"
                }`}
              >
                <p className="font-semibold">{meta.name}</p>
                <p className="text-sm text-muted-foreground">{meta.description}</p>
              </button>
            ))}
          </div>
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {message ? <p className="text-sm text-primary">{message}</p> : null}

        <Button onClick={handleSave} disabled={isSaving} className="w-full">
          {isSaving ? "Saving profile..." : "Save profile"}
        </Button>
      </CardContent>
    </Card>
  );
}
