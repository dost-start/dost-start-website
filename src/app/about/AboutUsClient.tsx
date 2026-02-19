"use client";

import PageTitle from "@/components/PageTitle";
import GlassSurface from "@/components/GlassSurface";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Image from "next/image";
import contactImage from "../../../public/contact-image.png";

export default function AboutUsClient() {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* TracingBeam - hidden on mobile */}
      <div className="hidden md:block">
        <TracingBeam 
          className="max-w-6xl"
          gradientStart="#4A90E2"
          gradientMid="#F5D76E"
          gradientEnd="#4A90E2"
          dotColor="#4A90E2"
        >
          <div className="pt-6 md:pt-8">
            <PageTitle text="About Us" />
          </div>

          {/* Hero section */}
          <section className="mb-12 md:mb-16 mt-6 md:mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              <div className="md:col-span-2 order-2 md:order-1">
                <div className="relative w-full aspect-[16/9] rounded-xl md:rounded-2xl overflow-hidden">
                  <Image
                    src={contactImage}
                    alt="DOST START group photo"
                    fill
                    className="object-cover rounded-bl-[2rem] md:rounded-bl-[3rem] rounded-tr-[2rem] md:rounded-tr-[3rem] shadow-[0rem_0rem_1rem_rgba(0,0,0,0.8)]"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    placeholder="blur"
                    priority
                  />
                </div>
              </div>
              <div className="hidden md:flex md:col-span-1 items-center justify-center order-1 md:order-2">
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src="/about-us-image1.png"
                    alt="DOST START design"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Content section with glassmorphism */}
          <section className="mb-12 md:mb-16 relative">
            <div className="md:px-8 md:mx-6 space-y-6 md:space-y-12">
              {/* What is START - Glass panel */}
              <div>
                <GlassSurface
                  width="100%"
                  height={450}
                  borderRadius={20}
                  variant="light"
                  matte
                  className="overflow-visible w-full relative z-10 min-h-0 md:min-h-[320px]"
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
                  <div className="flex flex-col p-4 sm:p-6 md:p-10 z-10 relative w-full h-full min-h-0">
                    <h1 className="text-xl sm:text-2xl md:text-4xl mb-3 md:mb-6 font-orbitron text-primary text-left">
                      WHAT IS START?
                    </h1>
                    <div className="space-y-3 md:space-y-4">
                      <p className="text-sm sm:text-base md:text-lg text-justify text-foreground/90 leading-relaxed">
                        START (Scholars Transforming Advancement and Research for Technology) 
                        is a national organization of scholars from the Department of Science 
                        and Technology - Science Education Institute (DOST-SEI), committed to 
                        bridging the technological gap across the Philippines. Representing all 
                        17 regions, we unite scholars with diverse expertise in various tech fields, 
                        fostering collaboration, innovation, and regional development.
                      </p>
                      <p className="text-sm sm:text-base md:text-lg text-justify text-foreground/90 leading-relaxed">
                        Through our dynamic network, members share knowledge, mentor one another, 
                        and drive impactful tech solutions that benefit both local communities 
                        and the nation. START empowers scholars to become catalysts for change, 
                        transforming ideas into innovations that shape the future of technology 
                        in the Philippines.
                      </p>
                    </div>
                  </div>
                </GlassSurface>
              </div>

              {/* Vision section */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-10">
                <div className="flex-1">
                  <GlassSurface
                    width="100%"
                    height={300}
                    borderRadius={20}
                    variant="light"
                    matte
                    className="overflow-visible w-full relative z-10 min-h-0 md:min-h-[300px]"
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
                    <div className="flex flex-col gap-3 md:gap-4 p-4 sm:p-6 md:p-10 z-10 relative w-full h-full min-h-0">
                      <h2 className="text-lg sm:text-xl md:text-3xl font-semibold text-foreground font-orbitron">
                        Vision
                      </h2>
                      <p className="text-sm sm:text-base md:text-lg text-justify text-foreground/90 leading-relaxed">
                        START is dedicated to fostering technological development and
                        innovation through collaboration among scholars. By promoting
                        leadership, mentorship, and regional representation, the
                        organization aims to empower members to drive positive change
                        across all regions of the Philippines.
                      </p>
                    </div>
                  </GlassSurface>
                </div>
                <div className="relative w-full md:w-1/3 aspect-square md:flex md:items-end md:justify-end">
                  <div className="relative w-full h-full md:w-full md:h-3/4">
                    <Image
                      src="/about-us-image2.png"
                      alt="START Vision Design Image"
                      fill
                      className="object-contain drop-shadow-lg"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
              </div>

              {/* Mission section */}
              <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-10">
                <div className="relative w-full md:w-1/3 aspect-square">
                  <Image
                    src="/about-us-image3.png"
                    alt="START Logo Mission Image"
                    fill
                    className="object-contain drop-shadow-lg"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex-1">
                  <GlassSurface
                    width="100%"
                    height={320}
                    borderRadius={20}
                    variant="light"
                    matte
                    className="overflow-visible w-full relative z-10 min-h-0 md:min-h-[300px]"
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
                    <div className="flex flex-col gap-3 md:gap-4 p-4 sm:p-6 md:p-10 z-10 relative w-full h-full min-h-0">
                      <h2 className="text-lg sm:text-xl md:text-3xl font-semibold text-foreground font-orbitron">
                        Mission
                      </h2>
                      <p className="text-sm sm:text-base md:text-lg text-justify text-foreground/90 leading-relaxed">
                        We aim to build a future where DOST scholars across the
                        Philippines are united in a thriving community that fosters
                        collaboration and drives technological innovation. Through
                        collective efforts, we envision our scholars becoming key
                        contributors to the country&apos;s progress, shaping a
                        technologically advanced and sustainable nation.
                      </p>
                    </div>
                  </GlassSurface>
                </div>
              </div>
            </div>
          </section>
        </TracingBeam>
      </div>

      {/* Mobile view - without TracingBeam */}
      <div className="md:hidden">
        <div className="pt-6">
          <PageTitle text="About Us" />
        </div>

        {/* Hero section */}
        <section className="mb-8 mt-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
                <Image
                  src={contactImage}
                  alt="DOST START group photo"
                  fill
                  className="object-cover rounded-bl-[2rem] rounded-tr-[2rem] shadow-[0rem_0rem_1rem_rgba(0,0,0,0.8)]"
                  sizes="100vw"
                  placeholder="blur"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content section */}
        <section className="mb-8 relative">
          <div className="space-y-6">
            {/* What is START - Glass panel */}
            <div>
              <GlassSurface
                width="100%"
                height={450}
                borderRadius={20}
                variant="light"
                matte
                className="overflow-visible w-full relative z-10 min-h-0"
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
                <div className="flex flex-col p-4 sm:p-6 z-10 relative w-full h-full min-h-0">
                  <h1 className="text-xl sm:text-2xl mb-3 font-orbitron text-primary text-left">
                    WHAT IS START?
                  </h1>
                  <div className="space-y-3">
                    <p className="text-sm sm:text-base text-justify text-foreground/90 leading-relaxed">
                      START (Scholars Transforming Advancement and Research for Technology) 
                      is a national organization of scholars from the Department of Science 
                      and Technology - Science Education Institute (DOST-SEI), committed to 
                      bridging the technological gap across the Philippines. Representing all 
                      17 regions, we unite scholars with diverse expertise in various tech fields, 
                      fostering collaboration, innovation, and regional development.
                    </p>
                    <p className="text-sm sm:text-base text-justify text-foreground/90 leading-relaxed">
                      Through our dynamic network, members share knowledge, mentor one another, 
                      and drive impactful tech solutions that benefit both local communities 
                      and the nation. START empowers scholars to become catalysts for change, 
                      transforming ideas into innovations that shape the future of technology 
                      in the Philippines.
                    </p>
                  </div>
                </div>
              </GlassSurface>
            </div>

            {/* Vision section */}
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <GlassSurface
                  width="100%"
                  height={300}
                  borderRadius={20}
                  variant="light"
                  matte
                  className="overflow-visible w-full relative z-10 min-h-0"
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
                  <div className="flex flex-col gap-3 p-4 sm:p-6 z-10 relative w-full h-full min-h-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-foreground font-orbitron">
                      Vision
                    </h2>
                    <p className="text-sm sm:text-base text-justify text-foreground/90 leading-relaxed">
                      START is dedicated to fostering technological development and
                      innovation through collaboration among scholars. By promoting
                      leadership, mentorship, and regional representation, the
                      organization aims to empower members to drive positive change
                      across all regions of the Philippines.
                    </p>
                  </div>
                </GlassSurface>
              </div>
              <div className="relative w-full aspect-square">
                <Image
                  src="/about-us-image2.png"
                  alt="START Vision Design Image"
                  fill
                  className="object-contain drop-shadow-lg"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Mission section */}
            <div className="flex flex-col-reverse gap-4">
              <div className="relative w-full aspect-square">
                <Image
                  src="/about-us-image3.png"
                  alt="START Logo Mission Image"
                  fill
                  className="object-contain drop-shadow-lg"
                  sizes="100vw"
                />
              </div>
              <div className="flex-1">
                <GlassSurface
                  width="100%"
                  height={300}
                  borderRadius={20}
                  variant="light"
                  matte
                  className="overflow-visible w-full relative z-10 min-h-0"
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
                  <div className="flex flex-col gap-3 p-4 sm:p-6 z-10 relative w-full h-full min-h-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-foreground font-orbitron">
                      Mission
                    </h2>
                    <p className="text-sm sm:text-base text-justify text-foreground/90 leading-relaxed">
                      We aim to build a future where DOST scholars across the
                      Philippines are united in a thriving community that fosters
                      collaboration and drives technological innovation. Through
                      collective efforts, we envision our scholars becoming key
                      contributors to the country&apos;s progress, shaping a
                      technologically advanced and sustainable nation.
                    </p>
                  </div>
                </GlassSurface>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
