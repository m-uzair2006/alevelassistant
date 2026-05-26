import { createServerSupabaseClient } from "@/lib/supabase/server";
import { SUBJECTS } from "@/lib/constants/subjects";
import type { Subject } from "@/lib/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();

    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const data = await request.json();
    const {
      fullName,
      subjects,
    } = data;

    const normalizedName =
      typeof fullName === "string" ? fullName.trim() : "";
    const isSubject = (value: unknown): value is Subject =>
      typeof value === "string" &&
      SUBJECTS.some((subject) => subject.value === value);
    const normalizedSubjects = Array.isArray(subjects)
      ? subjects.filter(isSubject)
      : [];

    // Validate required fields
    if (!normalizedName || normalizedSubjects.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create or update user profile
    const { error } = await supabase
      .from("user_profiles")
      .upsert({
        id: user.id,
        email: user.email,
        full_name: normalizedName,
        avatar_url:
          user.user_metadata?.avatar_url ??
          user.user_metadata?.picture ??
          null,
        subjects: normalizedSubjects,
      });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to save profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
