/**
 * Booking page config — edit copy and Cal link here.
 *
 * TODO: Replace CAL_LINK with the real Cal.com username/event slug
 * (e.g. "your-username/discovery") once the event exists.
 */
export const CAL_LINK = "sprintzero/discovery";

export const CAL_URL = `https://cal.com/${CAL_LINK}`;

export const bookingCopy = {
  sectionNumber: "08",
  sectionName: "BOOK A SPRINT",
  headlineLine1: "Book the call.",
  headlineLine2: "Start the clock.",
  body: "A 30-minute discovery call. You bring the idea; we scope the sprint and confirm the 72-hour window. No pressure, no obligation — if it's not a fit, you'll know on the call.",
  covers: [
    "What you want shipped, and whether 72 hours is realistic for it",
    "The fixed scope and the ₹1,20,000 floor",
    "How handoff works — repo, keys, brand kit",
    "When the next sprint window opens",
  ],
} as const;
