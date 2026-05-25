"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export function SignOutButton() {
  const router = useRouter();
  const { signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/login");
  };

  return (
    <Button variant="outline" size="sm" onClick={handleSignOut} disabled={loading}>
      {loading ? "Signing out..." : "Sign out"}
    </Button>
  );
}
