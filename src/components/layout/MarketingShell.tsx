"use client";

import { usePathname } from "next/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Nav } from "@/components/ui/Nav";
import { StickyMobileCTA } from "@/components/ui/StickyMobileCTA";

type MarketingShellProps = {
  children: React.ReactNode;
};

/** Nav section IDs — must match homepage <Section id> values. */
const NAV_SECTION_IDS = [
  "what-we-build",
  "how-we-work",
  "the-internal-engine",
  "pricing",
] as const;

/** Client chrome: scroll-spy Nav + mobile sticky CTA around page sections. */
export function MarketingShell({ children }: MarketingShellProps) {
  const pathname = usePathname();
  const scrollActive = useActiveSection(NAV_SECTION_IDS);
  const activeHref =
    pathname === "/about" || pathname === "/contact" ? pathname : scrollActive;

  return (
    <>
      <Nav activeHref={activeHref} />
      {children}
      <StickyMobileCTA />
    </>
  );
}
