import BackButton from "@/components/BackButton";
import Gallery from "@/components/events/gallery";
import ShareButton from "@/components/events/ShareButton";
import MaxLayout from "@/components/MaxLayout";
import StartDiv from "@/components/StartDiv";
import StartDivider from "@/components/StartDivider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import eventsData from "@/lib/events";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, Globe, MapPin } from "lucide-react";
import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import placeholder from "../../../../public/event-placeholder.png";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  // Find the event based on the slug (from either past or upcoming events)
  const event =
    eventsData.pastEvents.find((e) => e.slug === slug) ||
    eventsData.upcomingEvents.find((e) => e.slug === slug);

  if (!event) {
    return {
      title: "Event Not Found",
      description: "The event you are looking for could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `DOST START - ${event.title}`;
  const description =
    event.description || `Join us for the event: ${event.title}`;

  const imageUrl =
    event.coverImage ??
    "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747205126/KickSTART_Luzon__25_12_x8pc8p.jpg";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.WEBSITE_DOMAIN_URL}/events/${slug}`,
      siteName: "DOST START",
      images: [
        {
          url: imageUrl,
          alt: event.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: `${process.env.WEBSITE_DOMAIN_URL}/events/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const pastEventSlugs: string[] = eventsData.pastEvents.map((value) => {
    return value.slug;
  });
  const upcomingEventSlugs: string[] = eventsData.upcomingEvents.map(
    (value) => {
      return value.slug;
    }
  );

  return [...pastEventSlugs, ...upcomingEventSlugs].map((value) => {
    return { slug: value };
  });
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const event = eventsData.pastEvents.find((event) => event.slug === slug);

  const event2 = eventsData.upcomingEvents.find((event) => event.slug === slug);

  const eventData = event || event2;

  if (!eventData) {
    return {
      notFound: true,
    };
  }

  return (
    <MaxLayout>
      <div className="px-1 mt-8">
        <BackButton className="mb-4" />
        <StartDiv className="p-0 overflow-hidden border-4 w-full">
          <Image
            src={eventData.coverImage ?? placeholder}
            alt="Event Image"
            height={2000}
            width={2000}
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
          />
        </StartDiv>

        <section className="my-4">
          <h1 className="font-bold text-2xl">{eventData.title}</h1>
          {eventData.tags && (
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {eventData.tags.map((tag, index) => {
                return (
                  <Badge variant={"outline"} key={index}>
                    {tag}
                  </Badge>
                );
              })}
            </div>
          )}
        </section>

        <section className="space-y-3 mt-6 font-light">
          <div className="flex">
            <MapPin className="mr-2 shrink-0 " strokeWidth={1.5} />{" "}
            <span>{eventData.location}</span>
          </div>
          <div className="flex">
            <Calendar className="mr-2 shrink-0" strokeWidth={1.5} />{" "}
            <span>{eventData.date ? formatDate(eventData.date) : "TBA"}</span>
          </div>
          <div className="flex">
            <Clock className="mr-2 shrink-0" strokeWidth={1.5} />{" "}
            {eventData.startingTime && eventData.endingTime ? (
              <span>
                {eventData.startingTime.toUpperCase() +
                  " - " +
                  eventData.endingTime.toUpperCase()}
              </span>
            ) : (
              <span>TBA</span>
            )}
          </div>
        </section>

        <section className="mt-6 px-1">
          <div className="space-x-4">
            {eventData.registrationLink && (
              <Button variant={"accent"} size={"lg"} className="px-10">
                Register
              </Button>
            )}
            <ShareButton />
          </div>
          {eventData.socialLinks && (
            <div className="flex mt-4 gap-3 px-1">
              {eventData.socialLinks.facebook && (
                <a href={eventData.socialLinks.facebook}>
                  <FaFacebook size={30} />
                </a>
              )}

              {eventData.socialLinks.instagram && (
                <a href={eventData.socialLinks.instagram}>
                  <FaInstagram size={30} />
                </a>
              )}
              {eventData.socialLinks.website && (
                <a href={eventData.socialLinks.website}>
                  <Globe size={30} />
                </a>
              )}
            </div>
          )}
        </section>

        <section>
          <h2 className="mt-12 text-xl font-extrabold">About this Event</h2>
          <p className="my-4">{eventData.description}</p>
          {eventData.hashtags && (
            <div className="flex gap-2">
              {eventData.hashtags.map((value, index) => {
                return (
                  <span key={value + " " + index} className="font-semibold">
                    <span className="text-xl">#</span>
                    {value}
                  </span>
                );
              })}
            </div>
          )}
        </section>

        {eventData.images && (
          <>
            <section className="mt-16">
              <div className="flex gap-2 items-center mb-4">
                <h2 className="text-xl font-extrabold shrink-0 ">
                  Event Gallery
                </h2>
                <StartDivider variant="accent" width="20%" />
                <StartDivider variant="accent" />
                <StartDivider variant="accent" />
                <StartDivider variant="accent" width="10%" />
              </div>
            </section>

            <Gallery images={eventData.images} />
          </>
        )}
      </div>
    </MaxLayout>
  );
}
