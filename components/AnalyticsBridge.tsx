"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function AnalyticsBridge() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const target = event.target.closest<HTMLElement>("[data-analytics]");
      if (!target?.dataset.analytics) return;
      track("cta_click", { id: target.dataset.analytics });
    };

    const onToggle = (event: Event) => {
      if (!(event.target instanceof HTMLDetailsElement)) return;
      const id = event.target.dataset.analytics;
      if (!id) return;
      track("detail_toggle", { id, open: event.target.open });
    };

    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, []);

  return null;
}
