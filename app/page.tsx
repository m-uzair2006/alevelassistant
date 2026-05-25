"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header, Main, Layout } from "@/components/layout";
import { Brain, BookOpen, BarChart3, Zap } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <Header>
        <div className="flex items-center gap-2">
          <Brain className="w-6 h-6 text-primary" />
          <span className="font-semibold text-lg">A Level Study</span>
        </div>
        <div className="flex gap-4">
          <Link href="/auth/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </Header>

      <Main className="py-12 sm:py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero */}
          <section className="space-y-6 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Study Smarter, Score Higher
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              The intelligent exam workspace for Cambridge A Levels. Get
              syllabus-aware AI guidance, examiner-style marking, and
              personalized study insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/auth/signup">
                <Button size="lg">Start Learning</Button>
              </Link>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </section>

          {/* Features Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
            <Card>
              <CardHeader>
                <Brain className="w-8 h-8 text-primary mb-4" />
                <CardTitle>AI Examiner</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get instant feedback on your answers like a Cambridge examiner would mark them.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="w-8 h-8 text-accent mb-4" />
                <CardTitle>Syllabus-Aware</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every explanation follows the Cambridge curriculum. No generic AI answers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-secondary mb-4" />
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track your weak areas, identify patterns, and get personalized recommendations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 text-destructive mb-4" />
                <CardTitle>Fast Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Upload an answer and get marked in seconds. No waiting for teachers.
                </CardDescription>
              </CardContent>
            </Card>
          </section>

          {/* Subjects */}
          <section className="space-y-6 pt-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Supported Subjects</h2>
              <p className="text-muted-foreground mt-2">Currently available</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { code: "9618", name: "Computer Science", ready: true },
                { code: "9709", name: "Mathematics", ready: true },
                { code: "9702", name: "Physics", ready: true },
              ].map((subject) => (
                <Card key={subject.code}>
                  <CardHeader>
                    <CardTitle>{subject.name}</CardTitle>
                    <CardDescription>Cambridge {subject.code}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">
                      {subject.ready ? "✓ Available" : "Coming Soon"}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary/10 rounded-lg p-12 text-center space-y-6 border border-primary/20">
            <h2 className="text-3xl font-bold">Ready to Ace Your Exams?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Join students across Cambridge A Levels who are improving their marks
              with intelligent study techniques.
            </p>
            <Link href="/auth/signup">
              <Button size="lg">Create Free Account</Button>
            </Link>
          </section>
        </div>
      </Main>
    </Layout>
  );
}
