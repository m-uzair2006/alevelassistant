export function Background() {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60 mask-fade-b" />
        <div className="absolute inset-x-0 top-0 h-[800px] bg-gradient-radial" />
        <div
          className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-40 animate-blob"
          style={{ background: "radial-gradient(circle, oklch(0.6 0.22 265 / 0.9), transparent 70%)" }}
        />
        <div
          className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full blur-3xl opacity-30 animate-blob"
          style={{ background: "radial-gradient(circle, oklch(0.6 0.22 300 / 0.9), transparent 70%)", animationDelay: "-6s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full blur-3xl opacity-25 animate-blob"
          style={{ background: "radial-gradient(circle, oklch(0.6 0.18 220 / 0.9), transparent 70%)", animationDelay: "-12s" }}
        />
      </div>
    );
  }