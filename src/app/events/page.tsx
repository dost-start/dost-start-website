import Gallery from "@/components/events/gallery";
import PastEventsSection from "@/components/events/PastEventsSection";
import CurrentEventsSection from "@/components/events/CurrentEventsSection";
import UpcomingEventsSection from "@/components/events/UpcomingEventsSection";
import MaxLayout from "@/components/MaxLayout";
import PageTitle from "@/components/PageTitle";
import StartDivider from "@/components/StartDivider";
import gallery from "@/lib/events/gallery";
import { getCategorizedEventsData, getEventTerms } from "@/lib/data";
import { ISR_REVALIDATE_SECONDS } from "@/lib/contentful";
import type { Metadata } from "next";
import TermFilter from "@/components/events/TermFilter";

// Enable ISR with 1-hour revalidation for better performance
export const revalidate = ISR_REVALIDATE_SECONDS;

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

interface EventsPageProps {
  searchParams: Promise<{ term?: string }>;
}

export default async function Page({ searchParams }: EventsPageProps) {
  const { term } = await searchParams;
  
  // Fetch events data (from Contentful or local fallback)
  const [eventsData, terms] = await Promise.all([
    getCategorizedEventsData(term),
    getEventTerms(),
  ]);

  const { currentEvents, upcomingEvents, pastEvents } = eventsData;

  return (
    <MaxLayout>
      <PageTitle text="Events" />
      
      {/* Term Filter - only show if there are multiple terms */}
      {terms.length > 1 && (
        <div className="flex justify-end px-2 sm:px-10 mb-4">
          <TermFilter terms={terms} currentTerm={term} />
        </div>
      )}
      
      <CurrentEventsSection
        currentEvents={currentEvents}
        upcomingEvents={upcomingEvents}
      />

      <section className="m-2 mt-14 sm:px-10">
        <UpcomingEventsSection
          upcomingEvents={upcomingEvents}
          currentEventsCount={currentEvents.length}
          className="mb-14"
        />
        <PastEventsSection pastEvents={pastEvents} />

        <div className="mt-14">
          <div className="flex items-center mb-4 gap-2">
            <h2 className="text-4xl font-bold shrink-0 mr-4 my-6">Gallery</h2>
            <StartDivider variant="accent" width="10%" />
            <StartDivider variant="accent" width="20%" />
            <StartDivider variant="accent" width="20%" />
            <StartDivider variant="accent" />
          </div>
          <Gallery images={gallery} />
        </div>
      </section>
    </MaxLayout>
  );
}
