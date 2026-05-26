"use client";

import { Background } from "@/components/landing/Background";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { AiDemo } from "@/components/landing/AiDemo";
import { Subjects } from "@/components/landing/Subjects";
import { Premium } from "@/components/landing/Premium";
import { Cta, Footer } from "@/components/landing/CtaFooter";

export default function Home() {
  return (
    <main className="theme-landing relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Background />
      <Nav />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <AiDemo />
      <Subjects />
      <Premium />
      <Cta />
      <Footer />
    </main>
  );
}
