"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Stack note: gsap + @gsap/react (stable current). Next 16.2.12 App Router.

let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  registered = true;
}

// Stage 2+: section fade-in / stagger via ScrollTrigger timelines.
// Example:
// gsap.from(".section", {
//   opacity: 0,
//   y: 24,
//   stagger: 0.08,
//   ease: "power2.out",
//   scrollTrigger: { trigger: ".section", start: "top 80%" },
// });

export { gsap, ScrollTrigger, useGSAP };
