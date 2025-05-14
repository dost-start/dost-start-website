import PageTitle from "@/components/PageTitle";
import StartDiv from "@/components/StartDiv";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  openGraph: {
    description: `START is a national organization of scholars of the Department
                of Science and Technology - Science Education Institute
                (DOST-SEI) committed to bridging the technological gap across
                the Philippines. Representing all 17 regions, the organization
                unites scholars with diverse expertise in various tech fields,
                aiming to foster collaboration, innovation, and regional
                development. By connecting technology-driven scholars, START
                creates a dynamic network where members can share knowledge,
                mentor one another, and drive impactful tech solutions that
                benefit both local communities and the nation.`,
    url: `${process.env.WEBSITE_DOMAIN_URL}/about`,
    siteName: "DOST START",
    images: [
      {
        url: "/contact-image.png",
        width: 1287,
        height: 574,
        alt: "DOST START",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: `${process.env.WEBSITE_DOMAIN_URL}/about`,
  },
};
export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <PageTitle text="About Us" />

      <section className="mb-12 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div className="md:col-span-2 order-2 md:order-1">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src="/contact-image.png"
                alt="DOST START group photo"
                fill
                className="object-cover rounded-bl-[3rem] rounded-tr-[3rem] shadow-[0rem_0rem_1rem_rgba(0,0,0,0.8)]"
                sizes="(max-width: 768px) 100vw, 66vw"
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

      <section className="mb-12 relative">
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-4">
          <div className="absolute top-0 w-4 h-110 bg-blue-500 border-2 border-black rounded-full"></div>
          <div className="absolute top-114 w-4 h-4 bg-blue-500 border-2 border-black rounded-full"></div>
          <div className="absolute top-122 w-4 h-34 bg-blue-500 border-2 border-black rounded-full"></div>
        </div>

        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-4">
          <div className="absolute bottom-122 w-4 h-34 bg-blue-500 border-2 border-black rounded-full"></div>
          <div className="absolute bottom-114 w-4 h-4 bg-blue-500 border-2 border-black rounded-full"></div>
          <div className="absolute bottom-0 w-4 h-110 bg-blue-500 border-2 border-black rounded-full"></div>
        </div>

        <div className="md:px-8 md:mx-6">
          <div className="flex flex-col mb-8">
            <h1 className="text-3xl mb-6 font-orbitron text-primary text-left">
              WHAT IS START?
            </h1>
            <div className="space-y-4">
              <p className="text-justify">
                START is a national organization of scholars of the Department
                of Science and Technology - Science Education Institute
                (DOST-SEI) committed to bridging the technological gap across
                the Philippines. Representing all 17 regions, the organization
                unites scholars with diverse expertise in various tech fields,
                aiming to foster collaboration, innovation, and regional
                development. By connecting technology-driven scholars, START
                creates a dynamic network where members can share knowledge,
                mentor one another, and drive impactful tech solutions that
                benefit both local communities and the nation.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:mb-10">
            <StartDiv className="start-dropshadow bg-primary flex-1 rounded-xl">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl md:text-3xl font-semibold">Vision</h2>
                <p className="text-justify">
                  START is dedicated to fostering technological development and
                  innovation through collaboration among scholars. By promoting
                  leadership, mentorship, and regional representation, the
                  organization aims to empower members to drive positive change
                  across all regions of the Philippines.
                </p>
              </div>
            </StartDiv>
            <div className="relative w-full md:w-1/3 aspect-square md:flex md:items-end md:justify-end">
              <div className="relative w-3/4 h-3/4 md:w-full md:h-3/4">
                <Image
                  src="/about-us-image2.png"
                  alt="START Vision Design Image"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-8">
            <div className="relative w-full md:w-1/3 aspect-square">
              <Image
                src="/about-us-image3.png"
                alt="START Logo Mission Image"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <StartDiv className="start-dropshadow bg-accent flex-1 rounded-xl">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl md:text-3xl font-semibold">Mission</h2>
                <p className="text-justify">
                  We aim to build a future where DOST scholars across the
                  Philippines are united in a thriving community that fosters
                  collaboration and drives technological innovation. Through
                  collective efforts, we envision our scholars becoming key
                  contributors to the country&apos;s progress, shaping a
                  technologically advanced and sustainable nation.
                </p>
              </div>
            </StartDiv>
          </div>
        </div>
      </section>
    </div>
  );
}
