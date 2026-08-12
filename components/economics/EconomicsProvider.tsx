"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { computeModel, DEFAULTS, type Inputs, type Model } from "@/lib/economics";
import { track } from "@/lib/analytics";

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
  const trackedInputs = useRef(new Set<keyof Inputs>());

  const set = useCallback((key: keyof Inputs, value: number) => {
    setInputs((previous) => ({ ...previous, [key]: value }));
    if (!trackedInputs.current.has(key)) {
      trackedInputs.current.add(key);
      track("calculator_changed", { field: key });
    }
  }, []);

  const value = useMemo<EconomicsContext>(
    () => ({
      inputs,
      set,
      model: computeModel(inputs),
    }),
    [inputs, set],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useEconomics() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useEconomics must be used inside EconomicsProvider");
  return ctx;
}
