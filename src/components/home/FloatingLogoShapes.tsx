"use client";

import { useEffect, useState } from "react";


export default function FloatingLogoShapes() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Mobile only: top depth - left, near edge */}
      <div
        className="absolute -left-[2%] top-[3%] block sm:hidden"
        style={{ transform: `translate3d(0, ${scrollY * 0.06}px, 0)` }}
      >
        <div className="w-14 h-14 rounded-full bg-primary/50 shadow-lg shadow-primary/15 animate-float-shape" style={{ animationDelay: "-1s" }} />
      </div>
      {/* Mobile only: top depth - right, near edge */}
      <div
        className="absolute right-[2%] top-[18%] block sm:hidden"
        style={{ transform: `translate3d(0, ${scrollY * 0.05}px, 0)` }}
      >
        <div className="w-12 h-12 rounded-lg bg-accent/60 shadow-lg shadow-accent/20 animate-float-shape" style={{ animationDelay: "-2s" }} />
      </div>
      {/* Left top: yellow square */}
      <div
        className="absolute -left-[12%] top-[5%] sm:left-[-8%] sm:top-[12%]"
        style={{ transform: `translate3d(0, ${scrollY * 0.1}px, 0)` }}
      >
        <div className="w-28 h-28 sm:w-80 sm:h-80 rounded-2xl bg-accent shadow-xl shadow-accent/25 animate-float-shape" />
      </div>
      {/* Left mid: blue circle - desktop only */}
      <div
        className="absolute -left-[10%] top-[42%] hidden sm:block"
        style={{ transform: `translate3d(0, ${scrollY * 0.12}px, 0)` }}
      >
        <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-primary shadow-xl shadow-primary/20 animate-float-shape" style={{ animationDelay: "-2s" }} />
      </div>
      {/* Left bottom: blue circle on mobile, yellow square on desktop */}
      <div
        className="absolute -left-[10%] bottom-[8%] sm:left-[-5%] sm:bottom-[8%]"
        style={{ transform: `translate3d(0, ${scrollY * 0.14}px, 0)` }}
      >
        <div className="hidden sm:block w-36 h-36 sm:w-48 sm:h-48 rounded-xl bg-accent shadow-xl shadow-accent/25 animate-float-shape" style={{ animationDelay: "-3.5s" }} />
        <div className="block sm:hidden w-24 h-24 rounded-full bg-primary shadow-xl shadow-primary/20 animate-float-shape" style={{ animationDelay: "-3.5s" }} />
      </div>
      {/* Right top: blue circle */}
      <div
        className="absolute -right-[12%] top-[5%] sm:right-[-6%] sm:top-[5%]"
        style={{ transform: `translate3d(0, ${scrollY * 0.06}px, 0)` }}
      >
        <div className="w-28 h-28 sm:w-96 sm:h-96 rounded-full bg-primary shadow-xl shadow-primary/20 animate-float-shape" style={{ animationDelay: "-4s" }} />
      </div>
      {/* Right mid: yellow square - desktop only */}
      <div
        className="absolute -right-[10%] top-[48%] hidden sm:block"
        style={{ transform: `translate3d(0, ${scrollY * 0.08}px, 0)` }}
      >
        <div className="w-44 h-44 sm:w-60 sm:h-60 rounded-2xl bg-accent shadow-xl shadow-accent/25 animate-float-shape" style={{ animationDelay: "-1s" }} />
      </div>
      {/* Right bottom: yellow on mobile, blue circle on desktop */}
      <div
        className="absolute -right-[10%] bottom-[8%] sm:right-[-4%] sm:bottom-[8%]"
        style={{ transform: `translate3d(0, ${scrollY * 0.1}px, 0)` }}
      >
        <div className="block sm:hidden w-24 h-24 rounded-2xl bg-accent shadow-xl shadow-accent/25 animate-float-shape" style={{ animationDelay: "-1s" }} />
        <div className="hidden sm:block w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-primary shadow-xl shadow-primary/20 animate-float-shape" style={{ animationDelay: "-5s" }} />
      </div>
      {/* Center-left: small accent - desktop only */}
      <div
        className="absolute left-[10%] bottom-[30%] hidden sm:block"
        style={{ transform: `translate3d(0, ${scrollY * 0.07}px, 0)` }}
      >
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-accent/80 shadow-lg shadow-accent/20 animate-float-shape" style={{ animationDelay: "-1.5s" }} />
      </div>
      {/* Center-right: small square - desktop only */}
      <div
        className="absolute right-[10%] top-[72%] hidden sm:block"
        style={{ transform: `translate3d(0, ${scrollY * 0.11}px, 0)` }}
      >
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-lg bg-accent/80 shadow-lg shadow-accent/20 animate-float-shape" style={{ animationDelay: "-2.5s" }} />
      </div>
    </div>
  );
}
