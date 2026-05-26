import { BookMarked, MessageSquare, TrendingUp } from "lucide-react";
import { SectionHeader } from "./Features";
import { Reveal } from "./Reveal";

const steps = [
  { n: "01", icon: BookMarked, title: "Choose Subjects", body: "Pick from Physics, Maths or Computer Science. Your AI adapts to each spec." },
  { n: "02", icon: MessageSquare, title: "Practice & Ask AI", body: "Solve past papers, ask follow-ups, get worked solutions in real time." },
  { n: "03", icon: TrendingUp, title: "Improve with Feedback", body: "Examiner-grade marking pinpoints exactly where to focus next." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="How it works"
          title={<>Three steps to a <em className="not-italic text-gradient-brand" style={{ fontFamily: "'Instrument Serif', serif" }}>better grade.</em></>}
        />
        <div className="relative mt-16 grid md:grid-cols-3 gap-5">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="relative glass rounded-2xl p-7">
              <div className="flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary/60 border border-border">
                  <s.icon className="h-4.5 w-4.5 text-foreground/80" />
                </div>
                <span className="text-xs tracking-[0.2em] text-muted-foreground">{s.n}</span>
              </div>
              <h3 className="mt-6 text-lg font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}