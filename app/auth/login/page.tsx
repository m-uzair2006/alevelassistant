"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Enter your credentials to access your study dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Email" type="email" />
          <Input placeholder="Password" type="password" />
          <Button className="w-full">Sign In</Button>
          <p className="text-sm text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
