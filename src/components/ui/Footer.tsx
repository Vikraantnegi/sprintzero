import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { MonoLabel } from "./MonoLabel";

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
    <footer className={cn("border-t border-hairline pt-space-8", className)}>
      <div className="grid grid-cols-1 gap-space-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-wordmark text-text">SprintZero.</p>
          <p className="mt-space-2 text-body text-muted">Idea in. Product out.</p>
        </div>

        <div>
          <MonoLabel className="mb-space-4 block">Studio</MonoLabel>
          <ul className="flex flex-col gap-space-3">
            {STUDIO_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-body text-muted no-underline transition-colors duration-fast ease-sz hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <MonoLabel className="mb-space-4 block">Channels</MonoLabel>
          {/* Desktop: full labels. Mobile: single @AsumaCodes social row. */}
          <ul className="hidden flex-col gap-space-3 md:flex">
            {CHANNELS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-body text-muted no-underline transition-colors duration-fast ease-sz hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap items-center gap-x-space-3 gap-y-space-2 md:hidden">
            <li>
              <span className="font-mono text-meta uppercase tracking-[0.1em] text-faint">
                @AsumaCodes
              </span>
            </li>
            <li className="font-mono text-meta text-faint" aria-hidden>
              —
            </li>
            {CHANNELS.map((link, i) => {
              const short = link.label.split(" · ")[0];
              return (
                <li key={link.href} className="flex items-center gap-space-3">
                  {i > 0 ? (
                    <span className="font-mono text-meta text-faint" aria-hidden>
                      ·
                    </span>
                  ) : null}
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-meta uppercase tracking-[0.1em] text-muted no-underline transition-colors duration-fast ease-sz hover:text-text"
                  >
                    {short}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <MonoLabel className="mb-space-4 block">Contact</MonoLabel>
          <Button variant="text" href="#start">
            Start a sprint
          </Button>
          <p className="mt-space-3 text-small text-muted">
            One operator. Replies in hours, not days.
          </p>
        </div>
      </div>

      <div className="mt-space-8 flex flex-col gap-space-3 border-t border-divider pt-space-5 sm:flex-row sm:items-center sm:justify-between">
        <MonoLabel size="caption" uppercase={false}>
          © {new Date().getFullYear()} SprintZero Studio — built in-house
        </MonoLabel>
        <MonoLabel size="caption" uppercase={false}>
          Next.js · Vercel · Supabase
        </MonoLabel>
      </div>
    </footer>
  );
}
