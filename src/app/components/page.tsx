import type { Metadata } from "next";
import { Grain } from "@/components/foundation";
import {
  BrandStrip,
  Button,
  CTABlock,
  FeatureCard,
  Footer,
  Input,
  Nav,
  SectionLabel,
  StatCard,
  Timeline,
  ToolCard,
} from "@/components/ui";
import { tokens } from "@/lib/tokens";
import { CurrencyDemo } from "./currency-demo";

export const metadata: Metadata = {
  title: "Components",
  description: "SprintZero Stage 2 component library preview.",
};

const colorChips = [
  ["--bg", tokens.color.bg],
  ["--surface-1", tokens.color.surface1],
  ["--surface-2", tokens.color.surface2],
  ["--text", tokens.color.text],
  ["--text-muted", tokens.color.textMuted],
  ["--text-faint", tokens.color.textFaint],
  ["--accent", tokens.color.accent],
  ["--accent-hover", tokens.color.accentHover],
  ["--accent-glow", tokens.color.accentGlow],
  ["--hairline", tokens.color.hairline],
  ["--divider", tokens.color.divider],
] as const;

const PIPELINE = [
  { id: "brief", label: "Brief" },
  { id: "scope", label: "Scope" },
  { id: "build", label: "Build" },
  { id: "deploy", label: "Deploy" },
  { id: "handoff", label: "Handoff" },
];

function Caption({
  children,
  accent = false,
  className,
}: {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
}) {
  return (
    <p
      className={[
        "font-mono text-[11px] leading-relaxed",
        accent ? "text-accent" : "text-faint",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </p>
  );
}

export default function ComponentsPage() {
  return (
    <main className="relative isolate min-h-svh overflow-x-hidden bg-bg pb-space-10">
      <Grain />

      <div className="relative mx-auto flex max-w-[1180px] flex-col gap-[112px] px-space-6 py-space-9 md:px-space-7">
        <header className="flex flex-col gap-space-5">
          <div className="flex flex-wrap items-baseline justify-between gap-space-5">
            <p className="section-label">SprintZero Studio — Component System</p>
            <p className="section-label">Stage 2 · Tokens locked</p>
          </div>
          <h1 className="max-w-[900px] font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-text">
            Every state, <em className="italic text-accent">rendered.</em>
          </h1>
          <p className="max-w-xl text-body text-muted">
            Nine component groups, built only from the Stage 1 tokens. Hover
            states are shown live and side-by-side as static copies. Motion is
            captioned in mono.
          </p>
          <div className="mt-space-5 h-px w-full bg-[var(--hairline)]" />
        </header>

        {/* 00 TOKENS */}
        <section className="flex flex-col gap-space-5">
          <SectionLabel number="00" name="Tokens in use (locked, Stage 1)" />
          <div className="flex flex-wrap gap-space-3">
            {colorChips.map(([name, value]) => (
              <div
                key={name}
                className="flex items-center gap-[10px] rounded-sm border border-hairline px-space-3 py-space-2"
              >
                <span
                  className="h-[14px] w-[14px] rounded-[2px] border border-[rgba(232,230,225,0.2)]"
                  style={{ background: value }}
                />
                <span className="font-mono text-[11px] text-muted">{name}</span>
              </div>
            ))}
          </div>
          <Caption>
            Radius 4 / 8 / 12 · spacing 4→128 · --ease cubic-bezier(0.2,0,0,1) ·
            --dur-fast 120ms · --dur-base 200ms. Nothing below is built from
            anything else. Section 10 adds only class patterns on top of Stage 1.
          </Caption>
        </section>

        {/* 01 BUTTONS */}
        <section className="flex flex-col gap-space-6">
          <SectionLabel number="01" name="Buttons" />

          <div className="grid grid-cols-1 gap-space-5 border-b border-divider pb-space-5 md:grid-cols-[120px_1fr]">
            <p className="font-mono text-[12px] text-faint">PRIMARY</p>
            <div className="flex flex-wrap items-center gap-space-4">
              <div className="flex flex-col gap-space-2">
                <Button>Start a sprint</Button>
                <Caption>default · live hover</Caption>
              </div>
              <div className="flex flex-col gap-space-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ background: "var(--accent-hover)" }}
                >
                  Start a sprint
                </button>
                <Caption>hover</Caption>
              </div>
              <div className="flex flex-col gap-space-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ boxShadow: "0 0 0 3px var(--accent-glow)" }}
                >
                  Start a sprint
                </button>
                <Caption>focus · ring accent-glow</Caption>
              </div>
              <div className="flex flex-col gap-space-2">
                <Button disabled>Start a sprint</Button>
                <Caption>disabled · opacity .4, no-cursor</Caption>
              </div>
              <div className="flex flex-col gap-space-2">
                <Button size="small">Start a sprint</Button>
                <Caption>small · 8/16</Caption>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-space-5 border-b border-divider pb-space-5 md:grid-cols-[120px_1fr]">
            <p className="font-mono text-[12px] text-faint">GHOST</p>
            <div className="flex flex-wrap items-center gap-space-4">
              <div className="flex flex-col gap-space-2">
                <Button variant="ghost">See the build</Button>
                <Caption>default · live hover</Caption>
              </div>
              <div className="flex flex-col gap-space-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{
                    background: "var(--surface-1)",
                    borderColor: "rgba(232,230,225,0.2)",
                  }}
                >
                  See the build
                </button>
                <Caption>hover · border 8%→20%</Caption>
              </div>
              <div className="flex flex-col gap-space-2">
                <Button variant="ghost" disabled>
                  See the build
                </Button>
                <Caption>disabled · opacity .4, no-cursor</Caption>
              </div>
              <div className="flex flex-col gap-space-2">
                <Button variant="ghost" size="small">
                  See the build
                </Button>
                <Caption>small</Caption>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-space-5 md:grid-cols-[120px_1fr]">
            <p className="font-mono text-[12px] text-faint">TEXT · ARROW</p>
            <div className="flex flex-wrap items-center gap-space-6">
              <Button variant="text" href="#scope">
                Read the sprint scope
              </Button>
              <Button trailingArrow>Start a sprint</Button>
              <Caption>
                arrow: transform translateX(0→3px) · 120ms · --ease. Underline is
                the only decoration allowed on amber text.
              </Caption>
            </div>
          </div>
        </section>

        {/* 02 CARDS */}
        <section className="flex flex-col gap-space-6">
          <div className="flex flex-col gap-space-3">
            <SectionLabel number="02" name="Cards" />
            <Caption>
              hover: translateY(0→-4px) · border 8%→rgba(224,168,50,0.3) ·
              box-shadow → 0 8px 32px rgba(224,168,50,0.06) · 200ms --ease. Optional
              magnetic pull clamped ≤4px · lerp 0.15 · off on touch + reduced-motion.
            </Caption>
          </div>

          <div className="grid gap-space-5 md:grid-cols-3">
            <div className="flex flex-col gap-space-3">
              <ToolCard index="02" name="Cursor" role="edits" magnetic />
              <Caption>tool card · default (hover me)</Caption>
            </div>
            <div className="flex flex-col gap-space-3">
              <ToolCard index="02" name="Cursor" role="edits" forceHover />
              <Caption accent>tool card · hover (static copy)</Caption>
            </div>
            <div className="flex flex-col gap-space-3">
              <StatCard value="72" unit="h" label="idea to deployed" />
              <Caption>stat card · mono numeral</Caption>
            </div>
          </div>

          <div className="grid gap-space-5 md:grid-cols-2">
            <div className="flex flex-col gap-space-3">
              <FeatureCard
                title="Agency Sprints"
                body="A fixed 72-hour window. You get a deployed, working MVP — code, infra, and handoff — not a slide deck."
                linkLabel="What's in scope"
                linkHref="#scope"
              />
              <Caption>feature card · default</Caption>
            </div>
            <div className="flex flex-col gap-space-3">
              <FeatureCard
                title="Agency Sprints"
                body="A fixed 72-hour window. You get a deployed, working MVP — code, infra, and handoff — not a slide deck."
                linkLabel="What's in scope"
                linkHref="#scope"
                forceHover
              />
              <Caption accent>feature card · hover (static copy)</Caption>
            </div>
          </div>
        </section>

        {/* 03 PIPELINE */}
        <section className="flex flex-col gap-space-6">
          <SectionLabel number="03" name="Pipeline / Progress" />
          <Timeline stages={PIPELINE} activeIndex={2} />
          <Caption>
            draw-on: completed segment scaleX(0→1) · 600ms --ease, stagger 120ms.
            Active node: accent-glow pulse 2s. Nodes 13px, segments 1px hairline.
          </Caption>
        </section>

        {/* 04 SECTION LABEL */}
        <section className="flex flex-col gap-space-6">
          <SectionLabel number="04" name="Section label" />
          <div className="flex flex-col gap-space-5 border-y border-divider py-space-6">
            <SectionLabel number="01" name="What we build" />
            <SectionLabel number="03" name="The internal engine" />
            <SectionLabel number="05" name="Pricing" trailingRule />
          </div>
          <Caption>
            13px mono, 0.1em tracking, uppercase, --text-faint. Optional trailing
            hairline. No animation.
          </Caption>
        </section>

        {/* 05 NAV */}
        <section className="flex flex-col gap-space-6">
          <SectionLabel number="05" name="Nav / Header" />
          <div className="flex flex-col gap-space-3 overflow-hidden rounded-lg border border-hairline">
            <Nav forceScrolled={false} activeHref="#pipeline" />
            <Caption className="px-space-4 pb-space-3">
              top state · transparent, no border, 20/32 padding
            </Caption>
          </div>
          <div className="flex flex-col gap-space-3 overflow-hidden rounded-lg border border-hairline">
            <Nav forceScrolled activeHref="#pipeline" />
            <Caption className="px-space-4 pb-space-3">
              scrolled · bg rgba(--bg, 0.88) + blur(12px), padding 12/32, wordmark
              20→18px, /STUDIO drops
            </Caption>
          </div>
        </section>

        {/* 06 BRAND STRIP */}
        <section className="flex flex-col gap-space-6">
          <SectionLabel number="06" name="Brand strip" />
          <BrandStrip />
          <Caption>
            marquee translateX(0→-50%) · 40s linear infinite · pause on hover ·
            prefers-reduced-motion. Facts only.
          </Caption>
        </section>

        {/* 07 CTA */}
        <section className="flex flex-col gap-space-6">
          <SectionLabel number="07" name="CTA block" />
          <CTABlock
            line1="Bring the idea."
            line2Italic="I'll bring the clock."
            body="One operator, one 72-hour window, one deployed MVP. Tell me what you want built and I'll tell you if it fits."
          />
          <Caption>
            radius-lg · --space-9 vertical · card texture + bottom glow. Two amber
            touches: italic phrase + CTA.
          </Caption>
        </section>

        {/* 08 FORM */}
        <section className="flex flex-col gap-space-6">
          <SectionLabel number="08" name="Input & Toggle" />
          <div className="grid gap-space-7 md:grid-cols-2">
            <div className="flex flex-col gap-space-5">
              <div className="flex flex-col gap-space-2">
                <Input label="Email" placeholder="you@company.com" id="email-default" />
                <Caption>default · click to see focus</Caption>
              </div>
              <div className="flex flex-col gap-space-2">
                <Input
                  label="Email"
                  id="email-focus"
                  placeholder="you@company.com"
                  forceFocus
                  readOnly
                />
                <Caption accent>
                  focus · border accent + 3px accent-glow ring
                </Caption>
              </div>
            </div>
            <CurrencyDemo />
          </div>
        </section>

        {/* 09 FOOTER */}
        <section className="flex flex-col gap-space-6">
          <SectionLabel number="09" name="Footer" />
          <Footer />
        </section>
      </div>
    </main>
  );
}
