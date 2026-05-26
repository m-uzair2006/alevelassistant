import Link from "next/link";
import { Brain } from "lucide-react";

export function Nav() {
  const links = [
    { href: "#features", label: "Features" },
    { href: "#how", label: "How it works" },
    { href: "#demo", label: "AI Demo" },
    { href: "#subjects", label: "Subjects" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <nav className="glass flex h-14 items-center justify-between rounded-full px-3 pl-5 shadow-elegant">
          <Link href="/" className="flex items-center gap-2 text-sm font-medium tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-gradient-brand shadow-glow">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="text-md font-bold">ALevel Assistant</span>
          </Link>
          <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Link href="/auth" className="hidden sm:inline-flex h-9 items-center rounded-full px-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sign in
            </Link>
            <Link
              href="/auth"
              className="inline-flex h-9 items-center rounded-full bg-gradient-brand px-4 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition-opacity"
            >
              Start free
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}