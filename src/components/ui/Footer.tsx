import { Button } from "./Button";

const STUDIO_LINKS = [
  { href: "#build", label: "What we build" },
  { href: "#work", label: "How we work" },
  { href: "#pricing", label: "Pricing" },
];

const CHANNELS = [
  { href: "https://youtube.com/@AsumaCodes", label: "YouTube · @AsumaCodes" },
  { href: "https://x.com/AsumaCodes", label: "X · @AsumaCodes" },
  { href: "https://github.com/AsumaCodes", label: "GitHub · @AsumaCodes" },
];

type FooterProps = {
  className?: string;
};

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={[
        "border-t border-hairline pt-space-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="grid grid-cols-1 gap-space-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-[20px] tracking-[-0.01em] text-text">
            SprintZero.
          </p>
          <p className="mt-space-2 text-body text-muted">Idea in. Product out.</p>
        </div>

        <div>
          <p className="section-label mb-space-4">Studio</p>
          <ul className="flex flex-col gap-space-3">
            {STUDIO_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-body text-muted transition-colors duration-[var(--dur-fast)] ease-[var(--ease)] hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-label mb-space-4">Channels</p>
          <ul className="flex flex-col gap-space-3">
            {CHANNELS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-body text-muted transition-colors duration-[var(--dur-fast)] ease-[var(--ease)] hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="section-label mb-space-4">Contact</p>
          <Button variant="text" href="#start">
            Start a sprint
          </Button>
          <p className="mt-space-3 text-small text-muted">
            One operator. Replies in hours, not days.
          </p>
        </div>
      </div>

      <div className="mt-space-8 flex flex-col gap-space-3 border-t border-divider pt-space-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] text-faint">
          © {new Date().getFullYear()} SprintZero Studio — built in-house
        </p>
        <p className="font-mono text-[11px] text-faint">
          Next.js · Vercel · Supabase
        </p>
      </div>
    </footer>
  );
}
