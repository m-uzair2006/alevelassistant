import { Reveal } from "./Reveal";

const stats = [
  { value: "24,000+", label: "Active learners" },
  { value: "1.8M", label: "Questions solved" },
  { value: "92,000", label: "Papers analyzed" },
  { value: "11M", label: "AI responses generated" },
];

export function Stats() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="glass rounded-2xl px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          {stats.map((s, i) => (
            <div key={s.label} className="text-center md:text-left" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="text-3xl md:text-4xl font-medium tracking-tight text-gradient">
                {s.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}