import Link from "next/link";

const links = [
  { href: "#process", label: "Process" },
  { href: "#deliverables", label: "Deliverables" },
  { href: "#start", label: "Start a sprint" },
];

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-8">
        <Link
          href="/"
          className="font-display text-sm font-bold tracking-[0.18em] uppercase text-chalk"
        >
          SprintZero
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-fog transition-colors hover:text-chalk"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#start"
          className="rounded-sm bg-signal px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-signal-deep"
        >
          Book 72h
        </a>
      </div>
    </header>
  );
}
