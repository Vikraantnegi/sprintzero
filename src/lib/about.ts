import { OPERATOR_LOCATION } from "@/lib/site";

/**
 * About page copy — honest one-operator story.
 * No personal name, no face, no invented metrics.
 */
export const aboutCopy = {
  sectionNumber: "09",
  sectionName: "ABOUT",
  headlineLine1: "One operator.",
  headlineLine2: "No agency theater.",
  intro: `SprintZero is a one-person software studio in ${OPERATOR_LOCATION}. You talk to the person who scopes, builds, and ships — not a PM chain or a bench of freelancers.`,
  whyTitle: "Why 72 hours",
  whyBody:
    "Fixed scope and a hard clock beat open-ended retainers. Discovery locks what ships; the pipeline turns an idea into a product foundation fast enough that you go straight to build. No mystery phases. No scope games.",
  buildsTitle: "What exists already",
  builds: [
    {
      name: "Propel",
      href: "https://trypropel.ai",
      body: "AI marketing CRM — built solo, end-to-end, live in production.",
    },
    {
      name: "Murmur",
      href: "https://app.trymurmur.studio",
      body: "The studio's own engine — idea to product foundation in ~10 minutes. Every sprint runs on it.",
    },
  ],
  publicTitle: "Built in public",
  publicBody:
    "Work, process, and shipping notes show up as @AsumaCodes — YouTube, X, and GitHub. Same handle everywhere. No ghost team.",
  channels: [
    { href: "https://youtube.com/@AsumaCodes", label: "YouTube" },
    { href: "https://x.com/AsumaCodes", label: "X" },
    { href: "https://github.com/AsumaCodes", label: "GitHub" },
  ],
} as const;
