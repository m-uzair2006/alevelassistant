import { Atom, Sigma, Code2 } from "lucide-react";
import { SectionHeader } from "./Features";
import { Reveal } from "./Reveal";

const subjects = [
  { code: "9702", name: "Physics", icon: Atom, blurb: "Mechanics, fields, quantum — modelled, marked and mastered.", tint: "from-[oklch(0.6_0.2_240)] to-[oklch(0.55_0.2_280)]" },
  { code: "9709", name: "Mathematics", icon: Sigma, blurb: "Pure, Mechanics, Statistics — every method, every variant.", tint: "from-[oklch(0.6_0.2_295)] to-[oklch(0.55_0.2_330)]" },
  { code: "9618", name: "Computer Science", icon: Code2, blurb: "Theory & code. From pseudocode to paper 4 problem solving.", tint: "from-[oklch(0.6_0.18_200)] to-[oklch(0.55_0.2_260)]" },
];

export function Subjects() {
  return (
    <section id="subjects" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Subjects"
          title={<>Trained on the syllabus, <em className="not-italic text-gradient-brand" style={{ fontFamily: "'Instrument Serif', serif" }}>not the internet.</em></>}
        />
        <div className="mt-16 grid md:grid-cols-3 gap-5">
          {subjects.map((s, i) => (
            <Reveal key={s.code} delay={i * 100}>
              <div className="group relative glass rounded-2xl p-7 overflow-hidden transition-all hover:-translate-y-1">
              <div className={`absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${s.tint} opacity-30 blur-3xl group-hover:opacity-50 transition-opacity`} />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-xl glass">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground tracking-widest">{s.code}</span>
                </div>
                <h3 className="mt-6 text-xl font-medium tracking-tight">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.blurb}</p>
              </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}