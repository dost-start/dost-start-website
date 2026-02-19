"use client";

import EventsSectionShapes from "@/components/home/EventsSectionShapes";
import OfficersPreviewSection from "@/components/home/OfficersPreviewSection";
import GlassSurface from "@/components/GlassSurface";
import gallery from "@/lib/events/gallery";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export default function EventsPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState({
    text: 0,
    img1: 0,
    img2: 0,
    img3: 0,
    glass: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      const progress = Math.max(0, 1 - (rect.top - viewportHeight * 0.3) / (viewportHeight * 0.5));
      const eased = progress * progress * (3 - 2 * progress);

      const offset = (viewportCenter - sectionCenter) * 0.05 * eased;
      // Parallax: images at different rates for depth; glass moves with section
      setParallax({
        text: 0,
        img1: (viewportCenter - sectionCenter) * 0.03 * eased,
        img2: (viewportCenter - sectionCenter) * 0.06 * eased,
        img3: (viewportCenter - sectionCenter) * 0.05 * eased,
        glass: offset,
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-56 pb-16 md:pb-32 w-full relative mb-20 md:mb-32 px-4 md:px-6 overflow-x-hidden"
    >
      <div className="w-full mx-auto relative max-w-5xl">
        {/* Image collage - above the events section */}
        <div
          className="relative z-10 flex flex-col md:flex-row gap-3 md:gap-2 w-full md:items-stretch mb-6 md:mb-10"
          style={{
            transform: `translate3d(0, ${parallax.img1}px, 0)`,
            transition: "transform 100ms ease-out",
          }}
        >
          <div className="relative md:w-[70%] shrink-0 flex items-center min-w-0">
            <Image
              src={gallery[0]}
              alt="Event 1"
              width={1200}
              height={800}
              className="w-full h-auto rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] object-cover md:object-contain"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </div>
          <div className="flex flex-row gap-3 md:flex-col md:gap-4 md:flex-1 md:-ml-12 md:justify-center min-w-0">
            <div
              className="relative flex-1 min-w-0 md:flex-initial md:ml-2 md:mr-4 md:max-w-[90%] md:self-end"
              style={{
                transform: `translate3d(0, ${parallax.img2}px, 0)`,
                transition: "transform 100ms ease-out",
              }}
            >
              <Image
                src={gallery[1]}
                alt="Event 2"
                width={900}
                height={675}
                className="w-full h-auto rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] object-cover md:object-contain"
                sizes="(max-width: 768px) 50vw, 28vw"
              />
            </div>
            <div
              className="relative flex-1 min-w-0 md:flex-initial md:-mt-3 md:ml-6 md:mr-2 md:max-w-[90%] md:self-start"
              style={{
                transform: `translate3d(0, ${parallax.img3}px, 0)`,
                transition: "transform 100ms ease-out",
              }}
            >
              <Image
                src={gallery[2]}
                alt="Event 3"
                width={900}
                height={675}
                className="w-full h-auto rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] object-cover md:object-contain"
                sizes="(max-width: 768px) 50vw, 28vw"
              />
            </div>
          </div>
        </div>

        {/* Events section - glass with text */}
        <div className="relative z-10">
          <div
            style={{
              transform: `translate3d(0, ${parallax.glass}px, 0)`,
              transition: "transform 100ms ease-out",
            }}
          >
            <GlassSurface
              width="100%"
              height={420}
              borderRadius={20}
              variant={"light"}
              matte
              className="overflow-visible w-full relative z-10 min-h-[340px] md:min-h-[420px]"
            >
              <div className="w-full h-full absolute inset-0 z-0 pointer-events-none rounded-[inherit]">
                <div
                  className="absolute inset-0 rounded-[inherit]"
                  style={{
                    backgroundImage: "url(/texture.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.15,
                  }}
                />
              </div>
              <div className="flex flex-col p-5 sm:p-6 md:p-8 z-10 relative w-full h-full items-start justify-center max-w-2xl min-h-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-6 font-orbitron text-left">
                  <span className="text-foreground">At </span>
                  <span className="text-primary">START,</span>
                </h2>
                <p className="text-left mb-3 md:mb-4 text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed">
                  we believe that meaningful collaboration begins with shared
                  experiences. Our gatherings are designed to{" "}
                  <span className="font-semibold text-primary">
                    connect scholars, ignite curiosity, and foster innovation
                  </span>{" "}
                  across all regions of the Philippines.
                </p>
                <p className="text-left mb-4 md:mb-8 text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed">
                  <span className="font-semibold text-primary">
                    United, We Innovate
                  </span>{" "}
                  continues this mission by equipping techno-scholars with the
                  skills, network, and experience they need to drive regional
                  development through technology and research.
                </p>
                <div className="mt-2 md:mt-4 w-full sm:w-auto">
                  <Link href="/events" className="block sm:inline-block">
                    <Button
                      variant="accent"
                      size="xl"
                      className="rounded-full w-full sm:w-[180px] h-11 sm:h-12 text-base md:text-lg font-medium border-2 border-white"
                    >
                      Events →
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassSurface>
          </div>
          <OfficersPreviewSection />
        </div>
        <EventsSectionShapes />
      </div>
    </section>
  );
}
