"use client";

import { useEffect, useState } from "react";

/**
 * Blurred logo-inspired shapes for the layout background.
 * Large, floating shapes with parallax scroll effect.
 */

export default function LogoBackgroundShapes() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      aria-hidden
    >
      {/* Yellow square (accent) - top left - large */}
      <div
        className="absolute left-[-5%] top-[-10%] w-[min(90vw,520px)] h-[min(90vw,520px)] sm:w-[520px] sm:h-[520px] rounded-2xl bg-accent opacity-[0.3]"
        style={{
          filter: "blur(80px)",
          transform: `translate3d(0, ${scrollY * 0.12}px, 0)`,
        }}
      />

      {/* Blue quarter-circle - top right - large */}
      <div
        className="absolute right-[-8%] top-[-5%] w-[min(85vw,480px)] h-[min(85vw,480px)] sm:w-[480px] sm:h-[480px] rounded-bl-full bg-primary opacity-[0.3]"
        style={{
          filter: "blur(90px)",
          transform: `translate3d(0, ${scrollY * 0.08}px, 0)`,
        }}
      />

      {/* Blue quarter-circle - bottom left - large */}
      <div
        className="absolute left-[-6%] bottom-[-15%] w-[min(80vw,420px)] h-[min(80vw,420px)] sm:w-[420px] sm:h-[420px] rounded-tr-full bg-primary opacity-[0.28]"
        style={{
          filter: "blur(75px)",
          transform: `translate3d(0, ${scrollY * 0.15}px, 0)`,
        }}
      />

      {/* Yellow square - mid right - large */}
      <div
        className="absolute right-[0%] top-1/2 w-[min(50vw,280px)] h-[min(50vw,280px)] sm:w-[280px] sm:h-[280px] rounded-xl bg-accent opacity-[0.25]"
        style={{
          filter: "blur(60px)",
          transform: `translateY(calc(-50% + ${scrollY * 0.1}px))`,
        }}
      />

      {/* Yellow square - bottom right - large */}
      <div
        className="absolute right-[5%] bottom-[10%] w-[min(45vw,240px)] h-[min(45vw,240px)] sm:w-[240px] sm:h-[240px] rounded-xl bg-accent opacity-[0.28]"
        style={{
          filter: "blur(65px)",
          transform: `translate3d(0, ${scrollY * 0.18}px, 0)`,
        }}
      />

      {/* Extra large rect - mid left */}
      <div
        className="absolute left-[-3%] top-[30%] w-[min(40vw,220px)] h-[min(60vw,360px)] sm:w-[220px] sm:h-[360px] rounded-2xl bg-primary/40 opacity-[0.25]"
        style={{
          filter: "blur(70px)",
          transform: `translate3d(0, ${scrollY * 0.06}px, 0)`,
        }}
      />
    </div>
  );
}
