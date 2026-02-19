"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Floating shapes for the contact page.
 * Combines always-visible floating shapes with reveal-on-scroll shapes.
 */
export default function ContactPageShapes() {
  const [scrollY, setScrollY] = useState(0);
  const revealRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Reveal effect for contact form section
      const section = revealRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const progress = Math.max(
          0,
          Math.min(1, 1 - (rect.top - viewportHeight * 0.2) / (viewportHeight * 0.6))
        );
        const eased = progress * progress * (3 - 2 * progress);
        setReveal(eased);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Always visible floating shapes - around Reach Us section */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden>
        {/* Top left - accent square */}
        <div
          className="absolute left-[2%] top-[15%] sm:left-[5%] sm:top-[20%]"
          style={{ transform: `translate3d(0, ${scrollY * 0.08}px, 0)` }}
        >
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl bg-accent/60 shape-outline-glow-accent animate-float-shape" />
        </div>

        {/* Mid left - accent circle - desktop only */}
        <div
          className="absolute left-[1%] top-[45%] hidden sm:block"
          style={{ transform: `translate3d(0, ${scrollY * 0.1}px, 0)` }}
        >
          <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-accent/70 shape-outline-glow-accent animate-float-shape" style={{ animationDelay: "-3s" }} />
        </div>
        {/* Mid right - primary square - desktop only */}
        <div
          className="absolute right-[2%] top-[50%] hidden sm:block"
          style={{ transform: `translate3d(0, ${scrollY * 0.09}px, 0)` }}
        >
          <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-2xl bg-primary/60 shape-outline-glow-primary animate-float-shape" style={{ animationDelay: "-1.5s" }} />
        </div>
        {/* Bottom left - small accent */}
        <div
          className="absolute left-[4%] bottom-[20%] sm:left-[8%] sm:bottom-[25%]"
          style={{ transform: `translate3d(0, ${scrollY * 0.12}px, 0)` }}
        >
          <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-lg bg-accent/50 shape-outline-glow-accent animate-float-shape" style={{ animationDelay: "-4s" }} />
        </div>
        {/* Bottom right - small primary */}
        <div
          className="absolute right-[5%] bottom-[18%] sm:right-[10%] sm:bottom-[22%]"
          style={{ transform: `translate3d(0, ${scrollY * 0.11}px, 0)` }}
        >
          <div className="w-14 h-14 sm:w-22 sm:h-22 rounded-full bg-primary/50 shape-outline-glow-primary animate-float-shape" style={{ animationDelay: "-2.5s" }} />
        </div>
      </div>

      {/* Reveal-on-scroll shapes - around contact form section */}
      <div
        ref={revealRef}
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden
      >
        {/* Left side shapes - reveal from left */}
        <div
          className="absolute -left-[6%] top-[15%] sm:-left-[8%] sm:top-[20%]"
          style={{
            opacity: reveal,
            transform: `translate3d(${30 * (1 - reveal)}px, ${scrollY * 0.05}px, 0) scale(${0.5 + reveal * 0.5})`,
            transition: "opacity 0.4s ease, transform 0.15s ease-out",
          }}
        >
          <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-2xl bg-accent shape-outline-glow-accent animate-float-shape" />
        </div>
        <div
          className="absolute -left-[7%] top-[55%] hidden sm:block"
          style={{
            opacity: reveal * 0.9,
            transform: `translate3d(${40 * (1 - reveal)}px, ${scrollY * 0.07}px, 0) scale(${0.4 + reveal * 0.6})`,
            transition: "opacity 0.5s ease 0.1s, transform 0.15s ease-out",
          }}
        >
          <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-primary shape-outline-glow-primary animate-float-shape" style={{ animationDelay: "-2s" }} />
        </div>
        <div
          className="absolute -left-[6%] bottom-[20%]"
          style={{
            opacity: reveal * 0.85,
            transform: `translate3d(${35 * (1 - reveal)}px, ${scrollY * 0.06}px, 0) scale(${0.45 + reveal * 0.55})`,
            transition: "opacity 0.5s ease 0.15s, transform 0.15s ease-out",
          }}
        >
          <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl bg-accent shape-outline-glow-accent animate-float-shape" style={{ animationDelay: "-3s" }} />
        </div>

        {/* Right side shapes - reveal from right */}
        <div
          className="absolute -right-[6%] top-[40%] hidden sm:block"
          style={{
            opacity: reveal * 0.9,
            transform: `translate3d(${-30 * (1 - reveal)}px, ${scrollY * 0.08}px, 0) scale(${0.4 + reveal * 0.6})`,
            transition: "opacity 0.5s ease 0.1s, transform 0.15s ease-out",
          }}
        >
          <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-2xl bg-accent shape-outline-glow-accent animate-float-shape" style={{ animationDelay: "-2.5s" }} />
        </div>
        <div
          className="absolute -right-[5%] bottom-[15%] sm:-right-[7%] sm:bottom-[18%]"
          style={{
            opacity: reveal * 0.85,
            transform: `translate3d(${-25 * (1 - reveal)}px, ${scrollY * 0.09}px, 0) scale(${0.5 + reveal * 0.5})`,
            transition: "opacity 0.5s ease 0.2s, transform 0.15s ease-out",
          }}
        >
          <div className="w-18 h-18 sm:w-28 sm:h-28 rounded-full bg-primary shape-outline-glow-primary animate-float-shape" style={{ animationDelay: "-1s" }} />
        </div>
      </div>
    </>
  );
}
