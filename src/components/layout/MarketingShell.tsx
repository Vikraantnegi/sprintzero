"use client";

import { useActiveSection } from "@/hooks/useActiveSection";
import { Nav } from "@/components/ui/Nav";

type MarketingShellProps = {
  children: React.ReactNode;
};

/** Nav section IDs — must match page <Section id> values. */
const NAV_SECTION_IDS = [
  "what-we-build",
  "how-we-work",
  "the-internal-engine",
  "pricing",
] as const;

/** Client chrome: scroll-spy Nav around server-rendered page sections. */
export function MarketingShell({ children }: MarketingShellProps) {
  const activeHref = useActiveSection(NAV_SECTION_IDS);

  return (
    <>
      <Nav activeHref={activeHref} />
      {children}
    </>
  );
}
