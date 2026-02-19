"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Floating logo shapes that reveal when scrolled into the events section.
 * Parallax effect: shapes move at different rates and fade/scale in as section enters view.
 */
export default function EventsSectionShapes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ reveal: 0, scrollY: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Reveal: 0 when section far below, ramps to 1 as it enters view
      const progress = Math.max(0, Math.min(1, 1 - (rect.top - viewportHeight * 0.2) / (viewportHeight * 0.6)));
      const eased = progress * progress * (3 - 2 * progress);

      setState({ reveal: eased, scrollY: window.scrollY });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseY = typeof window !== "undefined" ? state.scrollY : 0;

  return (
    <div
      ref={sectionRef}
      className="pointer-events-none absolute inset-0 z-20 rounded-3xl"
      aria-hidden
    >
      {/* Left shapes - reveal from left with parallax */}
      <div
        className="absolute -left-[8%] top-[10%]"
        style={{
          opacity: state.reveal,
          transform: `translate3d(${20 * (1 - state.reveal)}px, ${baseY * 0.05}px, 0) scale(${0.5 + state.reveal * 0.5})`,
          transition: "opacity 0.4s ease, transform 0.15s ease-out",
        }}
      >
        <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-2xl bg-accent shape-outline-glow-accent animate-float-shape" />
      </div>
      <div
        className="absolute -left-[9%] top-[55%] hidden sm:block"
        style={{
          opacity: state.reveal * 0.9,
          transform: `translate3d(${30 * (1 - state.reveal)}px, ${baseY * 0.07}px, 0) scale(${0.4 + state.reveal * 0.6})`,
          transition: "opacity 0.5s ease 0.1s, transform 0.15s ease-out",
        }}
      >
        <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-primary shape-outline-glow-primary animate-float-shape" style={{ animationDelay: "-2s" }} />
      </div>
      <div
        className="absolute -left-[9%] bottom-[15%]"
        style={{
          opacity: state.reveal * 0.85,
          transform: `translate3d(${25 * (1 - state.reveal)}px, ${baseY * 0.06}px, 0) scale(${0.45 + state.reveal * 0.55})`,
          transition: "opacity 0.5s ease 0.15s, transform 0.15s ease-out",
        }}
      >
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl bg-accent shape-outline-glow-accent animate-float-shape" style={{ animationDelay: "-3s" }} />
      </div>
      {/* Right shapes - reveal from right with parallax */}
      <div
        className="absolute -right-[8%] top-[45%] hidden sm:block"
        style={{
          opacity: state.reveal * 0.9,
          transform: `translate3d(${-20 * (1 - state.reveal)}px, ${baseY * 0.08}px, 0) scale(${0.4 + state.reveal * 0.6})`,
          transition: "opacity 0.5s ease 0.1s, transform 0.15s ease-out",
        }}
      >
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-accent shape-outline-glow-accent animate-float-shape" style={{ animationDelay: "-2.5s" }} />
      </div>
    
      
    </div>
  );
}
