import { SectionHeader } from "./Features";
import { Reveal } from "./Reveal";

const pillars = [
  { title: "Built for ambitious students", body: "Designed for the ones who refuse average. Calm, focused, relentless." },
  { title: "Personalized AI learning", body: "Your weak topics, your pace, your paper. Nothing generic, ever." },
  { title: "Exam-focused intelligence", body: "Every answer optimized for the mark scheme — not for sounding clever." },
  { title: "Real examiner methodology", body: "Built with people who've marked the papers. Trained on the rubric." },
];

export function Premium() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="The experience"
          title={<>It just feels <em className="not-italic text-gradient-brand" style={{ fontFamily: "'Instrument Serif', serif" }}>different.</em></>}
          sub="Most study apps were built to be used. This one was built to be lived in."
        />
        <div className="mt-16 grid md:grid-cols-2 gap-5">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="glass rounded-2xl p-7 flex gap-5">
              <div className="font-mono text-xs text-muted-foreground pt-1 tracking-widest">0{i + 1}</div>
              <div>
                <h3 className="text-lg font-medium">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}