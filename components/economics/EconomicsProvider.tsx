"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { computeModel, DEFAULTS, type Inputs, type Model } from "@/lib/economics";

type EconomicsContext = {
  inputs: Inputs;
  set: (key: keyof Inputs, value: number) => void;
  model: Model;
};

const Ctx = createContext<EconomicsContext | null>(null);

/**
 * Holds the numbers the reader supplies. The ledger and the cost comparison
 * are two views of one model, so dragging a slider in either moves both.
 * Server-component children pass straight through.
 */
export function EconomicsProvider({ children }: { children: ReactNode }) {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const value = useMemo<EconomicsContext>(
    () => ({
      inputs,
      set: (key, v) => setInputs((prev) => ({ ...prev, [key]: v })),
      model: computeModel(inputs),
    }),
    [inputs],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useEconomics() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useEconomics must be used inside EconomicsProvider");
  return ctx;
}
