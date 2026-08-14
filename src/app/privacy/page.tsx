/* DRAFT — requires legal review before public launch (KAN-78) */
import type { Metadata } from "next";
import { Grain, Hairline } from "@/components/foundation";
import {
  LenisProvider,
  MarketingShell,
  Section,
} from "@/components/layout";
import { BulletRow, Footer, SectionLabel } from "@/components/ui";
import {
  CONTACT_EMAIL,
  OPERATOR_LEGAL_NAME,
  OPERATOR_LOCATION,
  SITE_NAME,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} handles your data.`,
};

/** Draft date — bump when counsel finalizes (KAN-78). */
const LAST_UPDATED = "11 August 2026";

export default function PrivacyPage() {
  return (
    <>
      <Grain />
      <LenisProvider>
        <MarketingShell>
          <main>
            <Section className="!py-space-8 !pt-[calc(var(--space-9)+var(--space-8))]">
              {/* DRAFT — requires legal review before public launch (KAN-78) */}
              <article className="mx-auto w-full max-w-[760px]">
                <div className="mb-space-5">
                  <SectionLabel number="LEGAL" name="PRIVACY POLICY" />
                </div>

                <h1 className="font-display text-display-l font-normal text-text">
                  Privacy Policy
                </h1>

                <p className="mt-space-4 font-mono text-meta text-faint">
                  Draft date · {LAST_UPDATED}
                </p>

                <p className="mt-space-6 text-body text-muted">
                  This page explains what personal data SprintZero Studio
                  collects when you use this website, why we collect it, who
                  processes it, and how you can reach us. It describes our
                  practices in plain language. It is not a certification of any
                  particular compliance regime.
                </p>

                <Hairline className="my-space-8" />

                <section className="flex flex-col gap-space-4">
                  <h2 className="font-display text-h3 font-medium text-text">
                    Who we are
                  </h2>
                  <p className="text-body text-muted">
                    This site is operated by {OPERATOR_LEGAL_NAME}, based in{" "}
                    {OPERATOR_LOCATION}. For privacy questions or requests,
                    email{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-muted underline decoration-hairline underline-offset-2 transition-colors duration-fast ease-sz hover:text-accent-hover"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                </section>

                <Hairline className="my-space-8" />

                <section className="flex flex-col gap-space-4">
                  <h2 className="font-display text-h3 font-medium text-text">
                    What we collect
                  </h2>
                  <p className="text-body text-muted">
                    Depending on how you use the site, we may process:
                  </p>
                  <ul className="flex list-none flex-col gap-space-3 p-0">
                    <BulletRow>
                        <span className="font-mono text-meta uppercase tracking-[0.08em] text-faint">
                          Booking
                        </span>
                        <br />
                        Information you submit when scheduling a discovery call
                        through Cal.com (for example name, email, timezone, and
                        any notes you provide on the booking form). Cal.com
                        controls that booking interface; we receive the booking
                        details needed to run the call.
                      </BulletRow>
                    <BulletRow>
                        {/* analytics phrasing matches PostHog init — DNT-gated + identified_only (Phase 3) */}
                        <span className="font-mono text-meta uppercase tracking-[0.08em] text-faint">
                          Analytics
                        </span>
                        <br />
                        We use PostHog Cloud (EU region) to understand how the
                        site is used. We honor your browser&apos;s Do-Not-Track
                        setting: if it&apos;s on, we don&apos;t load analytics
                        or capture anything for your visit. For visitors without
                        Do-Not-Track, PostHog collects usage data such as pages
                        viewed, referrer, device and browser information, and
                        approximate location derived from IP. We only build a
                        persistent profile for people who identify themselves to
                        us (for example by booking a call) — anonymous browsing
                        stays anonymous. We use this to improve the site, not to
                        sell profiles.
                      </BulletRow>
                    <BulletRow>
                        <span className="font-mono text-meta uppercase tracking-[0.08em] text-faint">
                          Hosting &amp; CDN
                        </span>
                        <br />
                        Every visit hits our host and CDN. Vercel and Cloudflare
                        process standard request data (for example IP address,
                        user agent, and request URL) in server and edge logs as
                        part of delivering the site.
                      </BulletRow>
                    <BulletRow>
                        <span className="font-mono text-meta uppercase tracking-[0.08em] text-faint">
                          Email
                        </span>
                        <br />
                        If we send transactional messages related to a booking
                        or project (confirmations, handoff notes, invoices),
                        those are delivered via Resend. Content is limited to
                        what the message requires.
                      </BulletRow>
                    <BulletRow>
                        <span className="font-mono text-meta uppercase tracking-[0.08em] text-faint">
                          Contact
                        </span>
                        <br />
                        If you email us directly, we process whatever you
                        include in that message so we can reply.                         We do not run a
                        separate marketing signup form on this site today.
                      </BulletRow>
                  </ul>
                </section>

                <Hairline className="my-space-8" />

                <section className="flex flex-col gap-space-4">
                  <h2 className="font-display text-h3 font-medium text-text">
                    Why we process it
                  </h2>
                  <p className="text-body text-muted">
                    We use this information to schedule and run discovery calls,
                    scope and deliver sprint work you request, respond to
                    inquiries, send transactional messages tied to that work,
                    and improve the reliability and clarity of this website.
                  </p>
                </section>

                <Hairline className="my-space-8" />

                <section className="flex flex-col gap-space-4">
                  <h2 className="font-display text-h3 font-medium text-text">
                    Where it is processed
                  </h2>
                  <p className="text-body text-muted">
                    We rely on the following processors for the functions above:
                  </p>
                  <ul className="flex list-none flex-col gap-space-3 p-0">
                    <BulletRow>
                        <span className="font-mono text-meta uppercase tracking-[0.08em] text-faint">
                          Vercel
                        </span>{" "}
                        — website hosting; processes request logs (IP, request
                        metadata) for every visit
                      </BulletRow>
                    <BulletRow>
                        <span className="font-mono text-meta uppercase tracking-[0.08em] text-faint">
                          Cloudflare
                        </span>{" "}
                        — DNS, CDN, and email-address protection; proxies
                        requests to the site
                      </BulletRow>
                    <BulletRow>
                        <span className="font-mono text-meta uppercase tracking-[0.08em] text-faint">
                          Cal.com
                        </span>{" "}
                        — scheduling and booking forms
                      </BulletRow>
                    <BulletRow>
                        <span className="font-mono text-meta uppercase tracking-[0.08em] text-faint">
                          PostHog Cloud EU
                        </span>{" "}
                        — product analytics (DNT-gated; identified-only)
                      </BulletRow>
                    <BulletRow>
                        <span className="font-mono text-meta uppercase tracking-[0.08em] text-faint">
                          Resend
                        </span>{" "}
                        — transactional email delivery
                      </BulletRow>
                  </ul>
                  <p className="text-body text-muted">
                    Each provider processes data under their own terms and
                    infrastructure. We do not control the full UI or backend of
                    Cal.com&apos;s booking flow; fields you enter there are
                    subject to Cal.com&apos;s practices as well as ours once we
                    receive the booking.
                  </p>
                </section>

                <Hairline className="my-space-8" />

                <section className="flex flex-col gap-space-4">
                  <h2 className="font-display text-h3 font-medium text-text">
                    Cookies and Do-Not-Track
                  </h2>
                  <p className="text-body text-muted">
                    When analytics run, PostHog may set cookies or use local
                    storage to tell sessions apart. We honor the Do-Not-Track
                    signal your browser can send — with it on, analytics
                    don&apos;t load. You can also clear or block cookies through
                    your browser settings. We don&apos;t currently show a cookie
                    consent banner; a fuller consent flow is under review before
                    we take on paying clients (KAN-78).
                  </p>
                </section>

                <Hairline className="my-space-8" />

                <section className="flex flex-col gap-space-4">
                  <h2 className="font-display text-h3 font-medium text-text">
                    Retention
                  </h2>
                  <p className="text-body text-muted">
                    We keep booking and project-related correspondence for as
                    long as needed to deliver the engagement and handle
                    follow-ups, then delete or archive it when it is no longer
                    required for those purposes or for legitimate business
                    records. Analytics events are retained according to our
                    PostHog project settings (subject to DNT — no capture when
                    Do-Not-Track is on). Host and CDN logs follow Vercel and
                    Cloudflare retention defaults. Email logs exist only as long
                    as delivery and troubleshooting require.
                  </p>
                </section>

                <Hairline className="my-space-8" />

                <section className="flex flex-col gap-space-4">
                  <h2 className="font-display text-h3 font-medium text-text">
                    Your rights and choices
                  </h2>
                  <p className="text-body text-muted">
                    You can ask us what personal data we hold about you, request
                    a correction, or ask us to delete data we control, by
                    emailing {CONTACT_EMAIL}. We will respond in a reasonable
                    time. Some data lives with processors (for example a Cal.com
                    booking); we will help you route those requests where we
                    can.
                  </p>
                  <p className="text-body text-muted">
                    We do not sell your personal data.
                  </p>
                </section>

                <Hairline className="my-space-8" />

                <section className="flex flex-col gap-space-4">
                  <h2 className="font-display text-h3 font-medium text-text">
                    Changes
                  </h2>
                  <p className="text-body text-muted">
                    If we change how we handle data in a material way, we will
                    update this page and the draft / last-updated date above.
                    Continued use of the site after an update means you have
                    seen the revised description of our practices.
                  </p>
                </section>

                <p className="mt-space-8 font-mono text-caption text-faint">
                  Draft for legal review · KAN-78 · not final counsel
                </p>
              </article>
            </Section>

            <Section terminal className="!pt-0 !pb-0">
              <Footer />
            </Section>
          </main>
        </MarketingShell>
      </LenisProvider>
    </>
  );
}
