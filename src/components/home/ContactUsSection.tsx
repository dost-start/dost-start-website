"use client";

import { Button } from "@/components/ui/button";
import GlassSurface from "@/components/GlassSurface";
import socialLinks from "@/components/SocialLinks";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ContactUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState({ glass: 0, divider: 0 });

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
        glass: offset,
        divider: offset * 0.5,
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-4 py-12 sm:py-16 md:py-24 overflow-x-hidden"
    >
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 md:space-y-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 md:mb-8 font-orbitron text-center px-1">
          Contact Us
        </h2>

        {/* Contact card - glass with parallax */}
        <div
          className="w-full"
          style={{
            transform: `translate3d(0, ${parallax.glass}px, 0)`,
            transition: "transform 100ms ease-out",
          }}
        >
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={20}
            variant="light"
            matte
            className="overflow-visible w-full relative z-10 min-h-[460px] sm:min-h-[420px] md:min-h-[360px]"
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-12 p-4 sm:p-6 md:p-8 z-10 relative w-full h-full min-h-0">
              <div className="md:col-span-2 flex flex-col justify-center min-w-0 order-1">
                <h3 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-6 text-foreground">
                  Get in touch
                </h3>
                <p className="text-foreground/90 text-sm md:text-base leading-relaxed mb-3 sm:mb-4 md:mb-6">
                  Have questions, suggestions, or opportunities to collaborate?
                  We&apos;d love to hear from you! Whether you&apos;re a fellow
                  scholar, potential partner, or simply curious about what we do,
                  START is always open to conversation. Reach out to us to learn
                  more about our programs, partnerships, or how you can be part of
                  this transformative journey.
                </p>
                <div className="w-full sm:w-auto">
                  <Link href="/contact-us" className="block sm:inline-block">
                    <Button
                      variant="accent"
                      size="xl"
                      className="rounded-full w-full sm:w-[250px] h-11 sm:h-12 text-base md:text-lg font-medium border-2 border-white"
                    >
                      Send us a message →
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:col-span-1 flex flex-col justify-center min-w-0 order-2 pt-2 sm:pt-0 border-t border-foreground/10 sm:border-t-0">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-foreground">
                  Socials
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {socialLinks.map(({ icon: Icon, text, link }) => (
                    <li key={text}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-foreground/90 hover:text-foreground hover:font-semibold transition-colors text-sm sm:text-base min-w-0"
                      >
                        <Icon size={20} className="shrink-0" />
                        <span className="min-w-0 break-words">
                          {text}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassSurface>
        </div>

        {/* Divider bars - theme-aligned, parallax */}
        <div
          className="px-2 w-full max-w-7xl mx-auto flex justify-center items-center gap-0.5 md:gap-1 my-4 md:my-8 min-w-0 overflow-hidden"
          style={{
            transform: `translate3d(0, ${parallax.divider}px, 0)`,
            transition: "transform 100ms ease-out",
          }}
        >
          {[7, 1, 20, 7, 1, 20, 7, 1, 20, 7, 1].map((n, i) => (
            <div
              key={i}
              className="h-1.5 md:h-2 bg-accent rounded-full border-2 border-foreground/20 flex-shrink min-w-[3px]"
              style={{ flex: `${n} ${n} 0%` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
