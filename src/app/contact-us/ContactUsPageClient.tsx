"use client";

import GlassSurface from "@/components/GlassSurface";
import socialLinks from "@/components/SocialLinks";
import ContactForm from "@/components/contact/ContactForm";
import ContactPageShapes from "@/components/contact/ContactPageShapes";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import image from "../../../public/contact-image.png";
import { useEffect, useRef, useState } from "react";

export default function ContactUsPageClient() {
  const reachUsRef = useRef<HTMLElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [reachUsParallax, setReachUsParallax] = useState({ image: 0, content: 0 });
  const [parallax, setParallax] = useState({ glass: 0, divider: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;

      const reachUsSection = reachUsRef.current;
      if (reachUsSection) {
        const rect = reachUsSection.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const progress = Math.max(
          0,
          1 - (rect.top - viewportHeight * 0.3) / (viewportHeight * 0.5)
        );
        const eased = progress * progress * (3 - 2 * progress);
        setReachUsParallax({
          image: (viewportCenter - sectionCenter) * 0.04 * eased,
          content: (viewportCenter - sectionCenter) * 0.05 * eased * 0.5,
        });
      }

      const contactSection = sectionRef.current;
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const progress = Math.max(
          0,
          1 - (rect.top - viewportHeight * 0.3) / (viewportHeight * 0.5)
        );
        const eased = progress * progress * (3 - 2 * progress);
        const offset = (viewportCenter - sectionCenter) * 0.05 * eased;
        setParallax({ glass: offset, divider: offset * 0.5 });
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="px-2 sm:px-4 md:px-6 relative">
      {/* Floating shapes throughout the page */}
      <ContactPageShapes />
      


      {/* Reach Us - styled like OfficersPreviewSection */}
      <section
        ref={reachUsRef}
        className="max-w-7xl px-4 md:px-6 w-full mx-auto mb-12 md:mb-16 pt-8 sm:pt-12 md:pt-16 relative"
      >
        <div className="w-full relative flex flex-col-reverse lg:flex-row items-center gap-6 md:gap-8">
          <div
            className="w-full xl:w-3/5 xl:absolute xl:left-0 xl:top-0 xl:bottom-0 xl:pl-6"
            style={{
              transform: `translate3d(0, ${reachUsParallax.image}px, 0)`,
              transition: "transform 100ms ease-out",
            }}
          >
            <div className="relative w-full h-full min-h-[240px] md:min-h-[320px] xl:min-h-0">
              <Image
                src={image}
                alt="Contact Us"
                fill
                className="object-cover rounded-tl-3xl rounded-br-3xl shadow-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 55vw"
                priority
              />
            </div>
          </div>

          <div
            className="lg:w-3/5 xl:w-1/3 xl:ml-auto relative z-10"
            style={{
              transform: `translate3d(0, ${reachUsParallax.content}px, 0)`,
              transition: "transform 100ms ease-out",
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 font-orbitron text-foreground">
              Reach Us!
            </h2>
            <p className="text-justify mb-6 md:mb-8 text-sm md:text-base text-foreground/90">
              At START, we believe in the power of meaningful connections.
              Whether you&apos;re a scholar with a big idea, a partner interested
              in collaboration, or a curious visitor wanting to know more,
              we&apos;re here to listen. Reach out and let&apos;s work together to
              build a future driven by innovation, leadership, and unity among
              Filipino tech scholars.
            </p>
            <div className="mt-2 md:mt-4 w-full sm:w-auto">
              <a href="#contact-form" className="block sm:inline-block">
                <Button
                  variant="accent"
                  size="xl"
                  className="rounded-full w-full sm:w-[200px] h-11 sm:h-12 text-base md:text-lg font-medium border-2 border-white"
                >
                  Message us →
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact-form"
        ref={sectionRef}
        className="w-full py-2 sm:py-4 md:py-6 overflow-x-hidden relative"
      >
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-10">
          {/* Contact card - GlassSurface (copied pattern from home ContactUsSection) */}
          <div
            className="w-full"
            style={{
              transform: `translate3d(0, ${parallax.glass}px, 0)`,
              transition: "transform 100ms ease-out",
            }}
          >
            <GlassSurface
              width="100%"
              height={520}
              borderRadius={20}
              variant="light"
              matte
              className="overflow-visible w-full relative z-10 min-h-[820px] sm:min-h-[740px] md:min-h-[560px]"
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-10 p-4 sm:p-6 md:p-8 z-10 relative w-full h-full min-h-0">
                <div className="md:col-span-1 flex flex-col justify-center min-w-0 order-1">
                  <h3 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-6 text-foreground">
                    Contact Information
                  </h3>
                  <p className="text-foreground/90 text-sm md:text-base leading-relaxed mb-4 sm:mb-5 md:mb-6">
                    We&apos;re always one message away! For inquiries,
                    partnerships, or feedback, feel free to connect with us
                    through any of our official channels.
                  </p>
                  <div className="pt-2 sm:pt-0 border-t border-foreground/10 md:border-t-0 md:pt-0 md:mt-2">
                    <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-foreground">
                      Socials
                    </h4>
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
                            <span className="min-w-0 break-words">{text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-col justify-center min-w-0 order-2 pt-4 md:pt-0 border-t border-foreground/10 md:border-t-0 md:border-l md:border-foreground/10 md:pl-8">
                  <h3 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-6 text-foreground">
                    Message us!
                  </h3>
                  <ContactForm />
                </div>
              </div>
            </GlassSurface>
          </div>

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
    </div>
  );
}

