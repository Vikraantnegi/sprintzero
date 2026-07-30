import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CtaSection } from "@/sections/cta";
import { DeliverablesSection } from "@/sections/deliverables";
import { HeroSection } from "@/sections/hero";
import { ProcessSection } from "@/sections/process";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <ProcessSection />
        <DeliverablesSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
