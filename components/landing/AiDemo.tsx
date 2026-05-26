import { Sparkles, User, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "./Features";
import { Reveal } from "./Reveal";

export function AiDemo() {
  return (
    <section id="demo" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="AI Demonstration"
          title={<>Marking that thinks like an <em className="not-italic text-gradient-brand" style={{ fontFamily: "'Instrument Serif', serif" }}>examiner.</em></>}
          sub="A glimpse at the workspace. Ask. Solve. Get graded with the rigor of a real paper."
        />

        <Reveal className="relative mt-16 mx-auto max-w-4xl block">
          <div className="absolute -inset-6 bg-gradient-brand opacity-15 blur-3xl rounded-full" />
          <div className="relative glass-strong rounded-2xl overflow-hidden shadow-elegant">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 text-xs text-muted-foreground">Physics 9702 · Paper 4 · Q3(b)</span>
              <span className="ml-auto text-xs text-muted-foreground">Today</span>
            </div>

            <div className="p-6 md:p-8 space-y-6">
              {/* Student question */}
              <div className="flex gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary border border-border">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="glass rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-xl">
                  A satellite of mass 620 kg orbits Earth at 7.8 km/s, radius 7,000 km. Show that the gravitational force provides the centripetal force, and calculate Earth's mass. <span className="text-muted-foreground">[4 marks]</span>
                </div>
              </div>

              {/* AI response */}
              <div className="flex gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-brand shadow-glow">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="space-y-3 max-w-2xl">
                  <div className="glass-strong rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed">
                    Equate gravitational and centripetal force:
                    <div className="my-2 rounded-md bg-black/30 px-3 py-2 font-mono text-xs text-foreground/90 border border-border">
                      GMm / r² = m v² / r  ⇒  M = v²r / G
                    </div>
                    Substituting v = 7.8×10³, r = 7.0×10⁶, G = 6.67×10⁻¹¹:
                    <div className="mt-2 text-foreground">
                      <span className="text-gradient-brand font-medium">M ≈ 6.39 × 10²⁴ kg</span>
                    </div>
                  </div>

                  {/* Examiner feedback */}
                  <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[oklch(0.78_0.16_160)]" />
                      Examiner feedback
                    </div>
                    <ul className="mt-3 space-y-1.5 text-sm text-foreground/90">
                      <li className="flex gap-2"><span className="text-[oklch(0.78_0.16_160)]">M1</span> Equation correctly stated.</li>
                      <li className="flex gap-2"><span className="text-[oklch(0.78_0.16_160)]">M2</span> Rearrangement shown.</li>
                      <li className="flex gap-2"><span className="text-[oklch(0.78_0.16_160)]">A1</span> Correct substitution with SI units.</li>
                      <li className="flex gap-2"><span className="text-[oklch(0.78_0.16_160)]">A1</span> Final value within tolerance.</li>
                    </ul>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">Mark scheme alignment: 4 / 4</div>
                      <div className="rounded-full bg-gradient-brand px-3 py-1 text-xs font-medium text-primary-foreground shadow-glow">
                        A* response
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}