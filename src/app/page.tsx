import { Grain } from "@/components/foundation";
import { LenisProvider, Placeholder, Section } from "@/components/layout";
import {
  BrandStrip,
  Button,
  FeatureCard,
  Footer,
  MonoLabel,
  Nav,
  StatCard,
  Timeline,
  ToolCard,
} from "@/components/ui";
import { PricingToggle } from "./_shell/PricingToggle";

const WORK_STAGES = [
  { id: "capture", label: "Capture · D0" },
  { id: "build", label: "Build · D1–2" },
  { id: "handoff", label: "Handoff · D3" },
] as const;

/** Skeleton engine stages (Layout Skeletons specimen). */
const ENGINE_STAGES = [
  "Idea",
  "Transcript",
  "Research",
  "Foundation",
  "Brand",
  "Architecture",
  "Task board",
  "Build",
  "Deploy",
] as const;

const STACK_TOOLS = [
  { name: "Claude", role: "Reasoning" },
  { name: "Cursor", role: "Editor" },
  { name: "Ollama", role: "Local LLM" },
  { name: "Whisper", role: "Audio" },
  { name: "Next.js", role: "App" },
  { name: "Supabase", role: "Data" },
  { name: "n8n", role: "Automation" },
  { name: "Vercel", role: "Deploy" },
  { name: "Playwright", role: "QA" },
  { name: "TBD", role: "Placeholder" },
] as const;

export default function Home() {
  return (
    <>
      <Grain />
      <LenisProvider>
        <Nav />
        <main>
          {/* 02 — Hero (skeleton order) */}
          <Section id="hero" hero>
            <div className="hero-grid">
              <div className="hero-grid__headline flex flex-col gap-space-3">
                <Placeholder label="Headline" className="min-h-0 border-0 p-0">
                  <h1 className="font-display text-display-xl text-text">
                    SprintZero.
                  </h1>
                  <p className="mt-space-3 max-w-md text-body text-muted">
                    Placeholder supporting line — Stage 4 copy.
                  </p>
                </Placeholder>
              </div>

              <div className="hero-grid__mark">
                <Placeholder label="Countdown" className="items-center">
                  <p className="font-mono text-stat text-text">72:00:00</p>
                </Placeholder>
              </div>

              <div className="hero-grid__ctas flex flex-wrap items-center gap-gap-btn">
                <Button href="#start" trailingArrow>
                  Start a sprint
                </Button>
                <Button href="#work" variant="ghost">
                  How we work
                </Button>
              </div>

              <div className="hero-grid__stats">
                <StatCard value="—" label="Stat A" />
                <StatCard value="—" label="Stat B" />
                <StatCard value="—" label="Stat C" />
              </div>
            </div>
          </Section>

          {/* 03 — What we build */}
          <Section id="build" number="03" name="What we build" trailingRule>
            <div className="split items-start">
              <div>
                <h2 className="font-display text-display-l text-text">
                  Headline placeholder
                </h2>
                <p className="mt-space-3 max-w-md text-body text-muted">
                  Supporting copy placeholder for Stage 4.
                </p>
              </div>
              <FeatureCard
                title="Feature placeholder"
                body="Card body placeholder — real content lands in Stage 4."
                linkLabel="Learn more"
                linkHref="#engine"
              />
            </div>
          </Section>

          {/* 04 — How we work */}
          <Section id="work" number="04" name="How we work" trailingRule>
            <h2 className="mb-space-6 font-display text-display-l text-text">
              Three stages
            </h2>
            <Timeline
              stages={[...WORK_STAGES]}
              activeIndex={1}
              orientation="responsive"
            />
          </Section>

          {/* 05 — Internal engine */}
          <Section id="engine" number="05" name="The internal engine" trailingRule>
            <div className="mb-space-3 flex flex-col gap-space-3 md:flex-row md:items-baseline md:justify-between">
              <MonoLabel>Engine</MonoLabel>
              <p className="max-w-lg text-body text-muted md:text-right">
                Nine-stage strip — capability, not hero.
              </p>
            </div>
            <h2 className="mb-space-6 font-display text-display-l text-text">
              Build engine
            </h2>
            <div className="engine-strip" role="list" aria-label="Build stages">
              {ENGINE_STAGES.map((stage, i) => (
                <Placeholder
                  key={stage}
                  label={stage}
                  className="min-h-[5.5rem] items-center justify-center p-space-2 text-center"
                  accent={i === 3}
                />
              ))}
            </div>
            <p className="engine-strip__hint mt-space-3 font-mono text-caption text-faint">
              ← swipe — faded right edge
            </p>
          </Section>

          {/* 06 — Stack */}
          <Section id="stack" number="06" name="The stack" trailingRule>
            <div className="split items-start">
              <div>
                <h2 className="font-display text-display-l text-text">
                  Tools we run
                </h2>
                <p className="mt-space-3 max-w-md text-body text-muted">
                  Stack placeholders for Stage 4.
                </p>
              </div>
              <div className="stack-grid">
                {STACK_TOOLS.map((tool, i) => (
                  <ToolCard
                    key={tool.name}
                    index={String(i + 1).padStart(2, "0")}
                    name={tool.name}
                    role={tool.role}
                  />
                ))}
              </div>
            </div>
          </Section>

          {/* 07 — Recent build */}
          <Section id="recent" number="07" name="Recent build" trailingRule>
            <div className="flex w-full flex-col gap-space-6">
              <div className="split items-start">
                <Placeholder
                  label="Screenshot · 16:10"
                  className="aspect-[16/10] min-h-[10rem]"
                />
                <div className="flex flex-col gap-space-4">
                  <h3 className="font-display text-h3 text-text">
                    Build name placeholder
                  </h3>
                  <p className="text-body text-muted">
                    Body copy placeholder — three lines land in Stage 4.
                  </p>
                  <Button variant="text" href="#start" trailingArrow>
                    View build
                  </Button>
                </div>
              </div>
              <Placeholder
                label="Testimonial — reserved · empty until real"
                className="min-h-[5rem]"
              />
            </div>
          </Section>

          {/* 08 — Pricing */}
          <Section id="pricing" number="08" name="Pricing" trailingRule>
            <div className="split items-start">
              <div>
                <h2 className="font-display text-display-l text-text">
                  Pricing placeholder
                </h2>
                <p className="mt-space-3 max-w-md text-body text-muted">
                  Toggle switches currency only — one price, two denominations.
                </p>
              </div>
              <div className="flex w-full flex-col gap-space-5 border border-hairline bg-surface-1 p-space-4 md:p-space-5">
                <PricingToggle />
                <Placeholder label="Price" className="min-h-0">
                  <p className="font-display text-price text-text">$—</p>
                </Placeholder>
                <ul className="flex flex-col gap-space-3">
                  {["Deliverable A", "Deliverable B", "Deliverable C", "Deliverable D"].map(
                    (item) => (
                      <li
                        key={item}
                        className="border-b border-divider pb-space-3 text-body text-muted last:border-0"
                      >
                        {item}
                      </li>
                    ),
                  )}
                </ul>
                <Button href="#start" className="w-full justify-center" trailingArrow>
                  Start a sprint
                </Button>
              </div>
            </div>
          </Section>

          {/* 09 — BrandStrip + Footer terminal */}
          <BrandStrip />
          <Section terminal className="pb-space-8 pt-space-8">
            <Footer />
          </Section>
        </main>
      </LenisProvider>
    </>
  );
}
