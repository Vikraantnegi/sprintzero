"use client";

import { useState } from "react";
import { Toggle } from "@/components/ui";

const PRICES = {
  inr: "₹ 1,20,000",
  usd: "$ 1,500",
} as const;

export function CurrencyDemo() {
  const [currency, setCurrency] = useState<"inr" | "usd">("inr");

  return (
    <div className="flex flex-col gap-space-5">
      <Toggle
        aria-label="Currency"
        options={[
          { value: "inr", label: "₹ INR" },
          { value: "usd", label: "$ USD" },
        ]}
        value={currency}
        onChange={setCurrency}
      />
      <p className="font-mono text-[11px] text-faint">
        live · active pill = accent-glow fill + amber label
      </p>
      <p className="font-display text-[40px] leading-none tracking-[-0.02em] text-text">
        {PRICES[currency]}
      </p>
    </div>
  );
}
