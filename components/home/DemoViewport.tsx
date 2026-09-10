"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

/** Fit the complete desktop player below the site navigation, including controls. */
export default function DemoViewport({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const container = frame.current;
    const player = container?.firstElementChild as HTMLElement | null;
    if (!container || !player) return;
    let pending = 0;
    const fit = () => {
      const desktop = window.matchMedia("(min-width: 701px)").matches;
      const width = container.clientWidth;
      player.style.width = desktop ? `${width}px` : "100%";
      const nav = document.querySelector(".pl-nav");
      const top = (nav?.getBoundingClientRect().height ?? 68) + 16;
      container.style.scrollMarginTop = `${top}px`;
      const available = Math.max(240, window.innerHeight - top - 16);
      const scale = desktop ? Math.min(1, available / Math.max(1, player.offsetHeight)) : 1;
      const next = String(Math.floor(scale * 1000) / 1000);
      if (player.style.zoom !== next) {
        player.style.zoom = next;
        window.dispatchEvent(new Event("demo-fit"));
      }
    };
    const schedule = () => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(fit);
    };
    fit();
    const observer = new ResizeObserver(schedule);
    observer.observe(container);
    observer.observe(player);
    window.addEventListener("resize", schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(pending);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return <div className="demo-viewport" ref={frame}>{children}</div>;
}
