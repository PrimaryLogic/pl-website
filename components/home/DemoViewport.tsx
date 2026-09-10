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
      const nav = document.querySelector(".pl-nav");
      const top = (nav?.getBoundingClientRect().height ?? 68) + 16;
      container.style.scrollMarginTop = `${top}px`;
      const available = Math.max(240, window.innerHeight - top - 16);
      const previousZoom = player.style.zoom;
      const previousWidth = player.style.width;
      const applyScale = (scale: number) => {
        player.style.zoom = String(scale);
        // Compensate for zoom so the rendered player still spans its container.
        player.style.width = desktop ? `${width / scale}px` : "100%";
      };
      applyScale(1);
      if (desktop && player.offsetHeight > available) {
        let lower = 0.1;
        let upper = 1;
        // Width changes can reflow text, so measure the fitted layout itself.
        for (let attempt = 0; attempt < 10; attempt += 1) {
          const scale = (lower + upper) / 2;
          applyScale(scale);
          if (player.offsetHeight * scale <= available) lower = scale;
          else upper = scale;
        }
        applyScale(Math.floor(lower * 1000) / 1000);
      }
      if (player.style.zoom !== previousZoom || player.style.width !== previousWidth) {
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
