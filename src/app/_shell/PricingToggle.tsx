"use client";

import { useState } from "react";
import { Toggle } from "@/components/ui/Toggle";

const OPTIONS = [
  { value: "inr", label: "₹ INR" },
  { value: "usd", label: "$ USD" },
] as const;

type Currency = (typeof OPTIONS)[number]["value"];

export function PricingToggle() {
  const [currency, setCurrency] = useState<Currency>("inr");

  return (
    <Toggle
      options={[...OPTIONS]}
      value={currency}
      onChange={setCurrency}
      aria-label="Currency"
    />
  );
}
