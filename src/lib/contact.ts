import { CONTACT_EMAIL } from "@/lib/site";

/**
 * Contact page copy — reachability + honest support window.
 * Booking stays on /book (no second Cal embed).
 */
export const contactCopy = {
  sectionNumber: "10",
  sectionName: "CONTACT",
  headlineLine1: "Reach the operator.",
  headlineLine2: "Not a ticket queue.",
  intro:
    "One person runs this studio. Email goes to that person. Support means the 30-day window after handoff — not a separate helpdesk org.",
  emailLabel: "Email",
  email: CONTACT_EMAIL,
  supportTitle: "What support means",
  supportBullets: [
    "Thirty days post-launch on what shipped — bug fixes and clarifying questions",
    "Out-of-scope features are a new conversation, not an open retainer",
    "Capacity is real and finite — honesty over fake SLAs",
  ],
  bookTitle: "Ready to scope a sprint?",
  bookBody:
    "Book a 30-minute discovery call. We lock scope, confirm the 72-hour window, and decide if it's a fit.",
  bookCta: "Book a discovery call",
} as const;
