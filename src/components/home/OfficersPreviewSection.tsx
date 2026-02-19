"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function OfficersPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState({ image: 0, content: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      const progress = Math.max(
        0,
        1 - (rect.top - viewportHeight * 0.3) / (viewportHeight * 0.5)
      );
      const eased = progress * progress * (3 - 2 * progress);

      const offset = (viewportCenter - sectionCenter) * 0.05 * eased;
      setParallax({
        image: (viewportCenter - sectionCenter) * 0.04 * eased,
        content: offset * 0.5,
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-7xl px-4 md:px-6 w-full mx-auto pt-24 sm:pt-32 md:pt-40 pb-16 xl:py-16"
    >
      <div className="w-full relative flex flex-col-reverse lg:flex-row items-center gap-6 md:gap-8">
        <div
          className="w-full xl:w-3/5 xl:absolute xl:left-0 xl:top-0 xl:bottom-0 xl:pl-6"
          style={{
            transform: `translate3d(0, ${parallax.image}px, 0)`,
            transition: "transform 100ms ease-out",
          }}
        >
          <div className="relative w-full h-full min-h-[240px] md:min-h-[320px] xl:min-h-0">
            <Image
              src="/officers.png"
              alt="Officers"
              fill
              className="object-cover rounded-tl-3xl rounded-br-3xl shadow-2xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 55vw"
            />
          </div>
        </div>

        <div
          className="lg:w-3/5 xl:w-1/3 xl:ml-auto relative z-10"
          style={{
            transform: `translate3d(0, ${parallax.content}px, 0)`,
            transition: "transform 100ms ease-out",
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 font-orbitron">
            Officers
          </h2>
          <p className="text-justify mb-6 md:mb-8 text-sm md:text-base">
            A group of enthusiastic and motivated DOST-SEI scholars committed
            to service and excellence are the driving force behind each START
            milestone. From department heads to the C-Suite, our officials
            uphold our dedication to regional empowerment, innovation, and
            inclusion. As the backbone of START, they are united by our
            objective and make sure that every activity is in line with our
            strategic vision and core values. Get to know the people driving
            the shift to a more intelligent and cohesive academic community.
          </p>
          <div className="mt-2 md:mt-4 w-full sm:w-auto">
            <Link href="/officers" className="block sm:inline-block">
              <Button
                variant="accent"
                size="xl"
                className="rounded-full w-full sm:w-[180px] h-11 sm:h-12 text-base md:text-lg font-medium border-2 border-white"
              >
                Officers →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
