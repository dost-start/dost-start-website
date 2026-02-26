import StickerPeel from "@/components/StickerPeel";
import GlassSurface from "@/components/GlassSurface";
import ContactUsSection from "@/components/home/ContactUsSection";
import EventsOfficersPreviewSection from "@/components/home/EventsPreviewSection";
import FloatingLogoShapes from "@/components/home/FloatingLogoShapes";
import ScrollIndicator from "@/components/home/ScrollIndicator";
import { getCategorizedEventsData } from "@/lib/data";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600; 

export const metadata: Metadata = {
  title:
    "DOST START - Scholars Transforming Advancement and Research for Technology",
  description:
    "United, We Innovate. DOST START brings together techno-scholars across the Philippines to drive innovation, collaboration, and technological advancement for sustainable regional development.",
  keywords: [
    "DOST",
    "START",
    "scholars",
    "technology",
    "innovation",
    "research",
    "Philippines",
    "DOST-SEI",
    "techno-scholars",
    "regional development",
    "collaboration",
  ],
  authors: [{ name: "DOST START" }],
  openGraph: {
    title: "DOST START - United, We Innovate",
    description:
      "Scholars Transforming Advancement and Research for Technology. Connecting techno-scholars across the Philippines for innovation and regional development.",
    url: process.env.WEBSITE_DOMAIN_URL,
    siteName: "DOST START",
    images: [
      {
        url: `${process.env.WEBSITE_DOMAIN_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "DOST START - United, We Innovate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOST START - United, We Innovate",
    description:
      "Scholars Transforming Advancement and Research for Technology. Connecting techno-scholars across the Philippines.",
    images: [`${process.env.WEBSITE_DOMAIN_URL}/og-image.png`],
  },
  alternates: {
    canonical: process.env.WEBSITE_DOMAIN_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default async function HomePage() {
  await getCategorizedEventsData();

  return (
    <>
      {/* Hero section */}
      <div className="flex flex-col w-full relative min-h-[80vh] items-center justify-center py-12 md:py-16 px-4">
        <FloatingLogoShapes />
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
          <div className="relative w-full min-h-[280px] flex items-center justify-center mb-4 md:mb-6">
            <StickerPeel
              imageSrc="/logo-s-outline.png"
              initialPosition="center"
              width={260}
              rotate={15}
              className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          {/* Title and Subtitle */}
          <div className="mb-4 md:mb-6 -mt-4 md:-mt-6">
            <h1 className="text-3xl md:text-5xl font-orbitron mb-1.5">
              <span className="text-primary">United,</span>{" "}
              <span className="text-foreground">We Innovate</span>
            </h1>
            <p className="text-primary md:text-lg leading-relaxed">
              Scholars Transforming Advancement and Research for Technology
            </p>
          </div>
          {/* Button */}
          <div className="mt-2 md:mt-4">
            <Link
              href="/about"
              className="inline-flex overflow-hidden rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] transition-opacity hover:opacity-95"
            >
              <GlassSurface
                borderRadius={9999}
                variant={"light"}
                width={180}
                height={48}
                className="!rounded-full w-full h-full"
              >
                <span className="relative z-10 flex h-full w-full items-center justify-center text-base md:text-lg font-medium text-foreground">
                  About START →
                </span>
              </GlassSurface>
            </Link>
          </div>
        </div>
        <ScrollIndicator />
      </div>

      <EventsOfficersPreviewSection />

      <ContactUsSection />
    </>
  );
}
