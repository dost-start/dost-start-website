import Gallery from "@/components/events/gallery";
import PastEventsSection from "@/components/events/PastEventsSection";
import CurrentAndUpcomingEventsSection from "@/components/events/UpcomingEventsSection";
import MaxLayout from "@/components/MaxLayout";
import PageTitle from "@/components/PageTitle";
import gallery from "@/lib/events/gallery";
import { getCategorizedEventsData } from "@/lib/data";
import type { Metadata } from "next";

// Enable ISR with 1-hour revalidation for better performance
export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: "Events - DOST START",
  description:
    "Stay updated with the latest DOST START events across the Philippines, uniting scholars in collaboration, innovation, and regional development. Discover upcoming workshops, summits, and conferences.",
  keywords: [
    "DOST START events",
    "tech events Philippines",
    "scholar events",
    "DOST-SEI events",
    "innovation summit",
    "tech workshops",
    "KickSTART",
    "technovation",
  ],
  openGraph: {
    title: "DOST START Events",
    description:
      "Discover upcoming events hosted or supported by DOST START. Engage with scholars, technologists, and innovators working toward sustainable regional growth.",
    url: `${process.env.WEBSITE_DOMAIN_URL}/events`,
    siteName: "DOST START",
    images: [
      {
        url: "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747205126/KickSTART_Luzon__25_12_x8pc8p.jpg",
        width: 1063,
        height: 736,
        alt: "DOST START Events",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOST START Events",
    description:
      "Stay updated with tech events across the Philippines. Join scholars in collaboration, innovation, and regional development.",
    images: [
      "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747205126/KickSTART_Luzon__25_12_x8pc8p.jpg",
    ],
  },
  alternates: {
    canonical: `${process.env.WEBSITE_DOMAIN_URL}/events`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Page() {
  // Fetch events data (from Contentful or local fallback)
  const eventsData = await getCategorizedEventsData();

  const { currentEvents, upcomingEvents, pastEvents } = eventsData;

  return (
    <MaxLayout>
      <div className="mt-15">
        <PageTitle text="Events" />
      </div>

      <section className="m-2 sm:px-10">
        <CurrentAndUpcomingEventsSection
          currentEvents={currentEvents}
          upcomingEvents={upcomingEvents}
          className="mb-14"
        />
        <PastEventsSection pastEvents={pastEvents} />


        <div className="p-5 mt-10 md:mt-14">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold shrink-0 sm:pr-4">
              Gallery
            </h2>
            
            {/* Standardized Responsive Divider */}
            <div className="flex flex-1 justify-start items-center gap-0.5 md:gap-1 min-w-0 overflow-hidden">
              {[7, 1, 20, 7, 1, 20, 7, 1, 20, 7, 1].map((n, i) => (
                <div
                  key={i}
                  className="h-1 md:h-2 bg-accent rounded-full border border-foreground/20 md:border-2 flex-shrink min-w-[3px]"
                  style={{ flex: `${n} ${n} 0%` }}
                />
              ))}
            </div>
          </div>

          <Gallery images={gallery} />
        </div>
      </section>
    </MaxLayout>
  );
}