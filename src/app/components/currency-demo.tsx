"use client";

import { useState } from "react";
import { MonoLabel, Toggle } from "@/components/ui";

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
      <MonoLabel size="caption">
        live · active pill = accent-glow fill + amber label
      </MonoLabel>
      <p className="font-display text-price text-text">{PRICES[currency]}</p>
    </div>
  );
}
