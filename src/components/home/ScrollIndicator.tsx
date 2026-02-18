"use client";

import { Mouse } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-foreground/70 hover:text-foreground transition-opacity duration-300 cursor-pointer group"
      aria-label="Scroll down"
    >
      <div className="animate-bounce-scroll">
        <Mouse className="w-8 h-8 md:w-10 md:h-10 stroke-[1.5]" />
      </div>
      <span className="text-xs uppercase tracking-wider opacity-80 group-hover:opacity-100">
        Let&apos;s START
      </span>
    </button>
  );
}
