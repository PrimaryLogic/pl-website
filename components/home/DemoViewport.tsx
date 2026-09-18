"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

/** Fit the whole player, including playback controls, inside the demo dialog. */
export default function DemoViewport({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const container = frame.current;
    const player = container?.querySelector<HTMLElement>(":scope > .sw");
    if (!container || !player) return;
    let pending = 0;
    const fit = () => {
      const desktop = window.matchMedia("(min-width: 701px)").matches;
      const previousZoom = player.style.zoom;
      const previousWidth = player.style.width;
      const width = container.clientWidth;
      const available = container.clientHeight;
      let scale = 1;
      player.style.zoom = "1";
      player.style.width = "100%";
      if (desktop && available > 0) {
        // Re-measure after wrapping changes instead of assuming a fixed player height.
        for (let pass = 0; pass < 3; pass++) {
          scale = Math.min(1, available / player.offsetHeight);
          player.style.zoom = String(scale);
          player.style.width = `${width / scale}px`;
        }
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
