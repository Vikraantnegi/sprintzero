import type { Metadata } from "next";
import { Grain } from "@/components/foundation";
import {
  BrandStrip,
  Button,
  CTABlock,
  FeatureCard,
  Footer,
  Input,
  MonoLabel,
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
    <MonoLabel
      size="caption"
      muted={accent ? "accent" : "faint"}
      uppercase={false}
      className={className}
    >
      {children}
    </MonoLabel>
  );
}

export default function ComponentsPage() {
  return (
    <main className="relative isolate min-h-svh overflow-x-hidden bg-bg pb-space-10">
      <Grain />

      <div className="relative mx-auto flex max-w-[1180px] flex-col gap-[112px] px-space-6 py-space-9 md:px-space-7">
        <header className="flex flex-col gap-space-5">
          <div className="flex flex-wrap items-baseline justify-between gap-space-5">
            <SectionLabel number="00" name="SprintZero Studio — Component System" />
            <MonoLabel>Stage 2 · Tokens locked</MonoLabel>
          </div>
          <h1 className="max-w-[900px] font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.05] tracking-[-0.02em] text-text">
            Every state, <em className="italic text-accent">rendered.</em>
          </h1>
          <p className="max-w-xl text-body text-muted">
            Nine component groups, built only from the Stage 1 tokens. Hover
            states are shown live and side-by-side as static copies. Motion is
            captioned in mono.
          </p>
          <div className="mt-space-5 h-px w-full bg-hairline" />
        </header>

        <section className="flex flex-col gap-space-5">
          <SectionLabel number="00" name="Tokens in use (locked, Stage 1)" />
          <div className="flex flex-wrap gap-space-3">
            {colorChips.map(([name, value]) => (
              <div
                key={name}
                className="flex items-center gap-gap-btn rounded-sm border border-hairline px-space-3 py-space-2"
              >
                <span
                  className="h-[14px] w-[14px] rounded-[2px] border border-hairline-strong"
                  style={{ background: value }}
                />
                <MonoLabel size="caption" muted="muted" uppercase={false}>
                  {name}
                </MonoLabel>
              </div>
            ))}
          </div>
          <Caption>
            Radius 4 / 8 / 12 · spacing 4→128 · --ease cubic-bezier(0.2,0,0,1) ·
            --dur-fast 120ms · --dur-base 200ms.
          </Caption>
        </section>

        <section className="flex flex-col gap-space-6">
          <SectionLabel number="01" name="Buttons" />

          <div className="grid grid-cols-1 gap-space-5 border-b border-divider pb-space-5 md:grid-cols-[120px_1fr]">
            <MonoLabel size="meta">PRIMARY</MonoLabel>
            <div className="flex flex-wrap items-center gap-space-4">
              <div className="flex flex-col gap-space-2">
                <Button>Start a sprint</Button>
                <Caption>default · live hover</Caption>
              </div>
              <div className="flex flex-col gap-space-2">
                <Button forceHover>Start a sprint</Button>
                <Caption>hover</Caption>
              </div>
              <div className="flex flex-col gap-space-2">
                <Button forceFocus>Start a sprint</Button>
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
            <MonoLabel size="meta">GHOST</MonoLabel>
            <div className="flex flex-wrap items-center gap-space-4">
              <div className="flex flex-col gap-space-2">
                <Button variant="ghost">See the build</Button>
                <Caption>default · live hover</Caption>
              </div>
              <div className="flex flex-col gap-space-2">
                <Button variant="ghost" forceHover>
                  See the build
                </Button>
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
            <MonoLabel size="meta">TEXT · ARROW</MonoLabel>
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

        <section className="flex flex-col gap-space-6">
          <div className="flex flex-col gap-space-3">
            <SectionLabel number="02" name="Cards" />
            <Caption>
              hover: translateY(0→-4px) · border → accent-border-hover · shadow
              accent-card · 200ms --ease. Magnetic ≤4px · lerp 0.15.
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

        <section className="flex flex-col gap-space-6">
          <SectionLabel number="03" name="Pipeline / Progress" />
          <Timeline stages={PIPELINE} activeIndex={2} />
          <Caption>
            draw-on: scaleX 600ms · stagger 120ms. Active node: pulse 2s. Nodes
            13px.
          </Caption>
        </section>

        <section className="flex flex-col gap-space-6">
          <SectionLabel number="04" name="Section label" />
          <div className="flex flex-col gap-space-5 border-y border-divider py-space-6">
            <SectionLabel number="01" name="What we build" />
            <SectionLabel number="03" name="The internal engine" />
            <SectionLabel number="05" name="Pricing" trailingRule />
          </div>
          <Caption>
            13px mono, 0.1em tracking, uppercase, --text-faint. No animation.
          </Caption>
        </section>

        <section className="flex flex-col gap-space-6">
          <SectionLabel number="05" name="Nav / Header" />
          <div className="flex flex-col gap-space-3 overflow-hidden rounded-lg border border-hairline">
            <Nav forceScrolled={false} activeHref="#pipeline" />
            <Caption className="px-space-4 pb-space-3">
              top state · transparent, no border, 20/32 padding. ≤768: wordmark
              18px + two-line hamburger → 60% right drawer.
            </Caption>
          </div>
          <div className="flex flex-col gap-space-3 overflow-hidden rounded-lg border border-hairline">
            <Nav forceScrolled activeHref="#pipeline" />
            <Caption className="px-space-4 pb-space-3">
              scrolled · bg-nav-scrolled + blur 12px, padding 12/32, wordmark
              20→18px
            </Caption>
          </div>
        </section>

        <section className="flex flex-col gap-space-6">
          <SectionLabel number="06" name="Brand strip" />
          <BrandStrip />
          <Caption>
            marquee 40s linear · pause on hover · prefers-reduced-motion.
          </Caption>
        </section>

        <section className="flex flex-col gap-space-6">
          <SectionLabel number="07" name="CTA block" />
          <CTABlock
            line1="Bring the idea."
            line2Italic="I'll bring the clock."
            body="One operator, one 72-hour window, one deployed MVP. Tell me what you want built and I'll tell you if it fits."
          />
          <Caption>
            Two amber touches: italic phrase + CTA. Primary text is near-black.
          </Caption>
        </section>

        <section className="flex flex-col gap-space-6">
          <SectionLabel number="08" name="Input & Toggle" />
          <div className="grid gap-space-7 md:grid-cols-2">
            <div className="flex flex-col gap-space-5">
              <div className="flex flex-col gap-space-2">
                <Input
                  label="Email"
                  placeholder="you@company.com"
                  id="email-default"
                />
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

        <section className="flex flex-col gap-space-6">
          <SectionLabel number="09" name="Footer" />
          <Footer />
        </section>
      </div>
    </main>
  );
}
