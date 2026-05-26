import { Brain, ClipboardCheck, Target, FileText, Repeat, BookOpen } from "lucide-react";
import { Reveal } from "./Reveal";

const features = [
  { icon: Brain, title: "AI Study Assistant", body: "A tutor that thinks in your syllabus. Ask anything, get clear, exam-grade answers." },
  { icon: ClipboardCheck, title: "Examiner-Style Marking", body: "Mark schemes, A* command words, real method marks — graded the way exams are." },
  { icon: Target, title: "Weak Topic Detection", body: "AI builds a live model of what you know and what's quietly costing you grades." },
  { icon: FileText, title: "Past Paper Workspace", body: "Every paper, every year. Annotate, solve, and review with AI side-by-side." },
  { icon: Repeat, title: "Smart Revision", body: "Adaptive recall sessions that surface exactly what you're about to forget." },
  { icon: BookOpen, title: "Syllabus-Aware AI", body: "Trained on 9702, 9709 and 9618. No off-spec answers. No noise." },
];

export function Features() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Core Features"
          title={<>An operating system <em className="not-italic text-gradient-brand" style={{ fontFamily: "'Instrument Serif', serif" }}>for serious students.</em></>}
          sub="Every tool you need to study, practice and improve — designed with the calm and precision of a pro studio."
        />
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="group glass relative rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.05]">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand shadow-glow">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="mt-5 text-base font-medium">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center block">
      <div className="inline-flex items-center rounded-full border border-border bg-secondary/40 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {eyebrow}
      </div>
      <h2 className="mt-5 text-3xl md:text-5xl font-medium tracking-[-0.03em] text-gradient leading-[1.1]">
        {title}
      </h2>
      {sub && <p className="mt-5 text-base text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}