import type { Metadata } from "next";
import { Grain, Hairline, HeroGlow } from "@/components/foundation";
import { MonoLabel } from "@/components/ui";
import { tokens } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Tokens",
  description: "SprintZero design token foundation preview.",
};

const colorEntries = Object.entries(tokens.color) as [
  keyof typeof tokens.color,
  string,
][];

export default function TokensPage() {
  return (
    <main className="relative isolate min-h-svh overflow-hidden bg-bg">
      <HeroGlow className="left-1/2 top-[-280px] h-[800px] w-[1200px] -translate-x-1/2" />
      <Grain />

      <div className="relative mx-auto flex max-w-5xl flex-col gap-space-8 px-space-6 py-space-9">
        <MonoLabel>01 — Foundation preview</MonoLabel>

        <h1 className="max-w-3xl font-display text-display-xl text-pretty text-text">
          The <em className="italic text-accent">72-hour</em> software studio.
        </h1>

        <p className="max-w-xl text-body text-muted">
          Outcome-priced, not hourly. Token proof for Stage 1 — fonts, color,
          grain, and glow before any section work.
        </p>

        <Hairline />

        <MonoLabel>02 — Color swatches</MonoLabel>

        <ul className="grid grid-cols-2 gap-space-4 sm:grid-cols-3 md:grid-cols-4">
          {colorEntries.map(([name, value]) => (
            <li
              key={name}
              className="overflow-hidden rounded-md border border-hairline bg-surface-1"
            >
              <div className="h-20" style={{ background: value }} />
              <div className="border-t border-divider px-space-4 py-space-3">
                <MonoLabel muted="text">{name}</MonoLabel>
                <p className="mt-space-1 font-mono text-caption text-faint">
                  {value}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <Hairline variant="inner" />

        <MonoLabel>03 — Card texture</MonoLabel>

        <div className="card-texture rounded-lg border border-hairline bg-surface-1 p-space-6">
          <p className="font-display text-h3 text-text">Agency Sprints</p>
          <p className="mt-space-3 text-small text-muted">
            Surface sample with hairline border and diagonal card texture.
          </p>
        </div>
      </div>
    </main>
  );
}
