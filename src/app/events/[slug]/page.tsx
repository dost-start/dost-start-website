import BackButton from "@/components/BackButton";
import Gallery from "@/components/events/gallery";
import ShareButton from "@/components/events/ShareButton";
import MaxLayout from "@/components/MaxLayout";
import StartDiv from "@/components/StartDiv";
import StartDivider from "@/components/StartDivider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import eventsData from "@/lib/events";
import { formatDateForDiv } from "@/lib/utils";
import { Calendar, Clock, Globe, MapPin } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { notFound } from "next/navigation";

const eventsArray = [
  ...eventsData.pastEvents,
  ...eventsData.upcomingEvents,
  ...(eventsData.currentEvents || []),
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Find the event based on the slug
  const event = eventsArray.find((e) => e.slug === slug);

  if (!event) {
    return {
      title: "Event Not Found",
      description: "The event you are looking for could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${event.title} - DOST START`;
  const description =
    event.description || `Join us for the event: ${event.title}`;

  const imageUrl =
    event.eventDisplayImage ?? event.coverImage ?? "/event-placeholder.png";

  return {
    title,
    description,
    keywords: [
      "DOST START",
      event.title,
      "tech event",
      "scholars",
      "innovation",
      "Philippines",
      ...(event.hashtags || []),
    ],
    openGraph: {
      title,
      description,
      url: `${process.env.WEBSITE_DOMAIN_URL}/events/${slug}`,
      siteName: "DOST START",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `${process.env.WEBSITE_DOMAIN_URL}/events/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  const pastEventSlugs = eventsData.pastEvents.map((event) => event.slug);
  const upcomingEventSlugs = eventsData.upcomingEvents.map(
    (event) => event.slug
  );
  const currentEventSlugs = (eventsData.currentEvents || []).map(
    (event) => event.slug
  );

  return [...pastEventSlugs, ...upcomingEventSlugs, ...currentEventSlugs].map(
    (slug) => ({
      slug: slug,
    })
  );
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const eventData = eventsArray.find((e) => e.slug === slug);

  if (!eventData) {
    notFound();
  }

  return (
    <MaxLayout>
      <div className="px-1 mt-8">
        <BackButton className="mb-4" />
        <StartDiv className="p-0 overflow-hidden border-4 w-full hidden lg:block">
          <Image
            src={eventData.coverImage}
            alt="Event Image"
            height={2000}
            width={2000}
            className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
          />
        </StartDiv>

        <section className="my-4 flex flex-col lg:flex-row gap-6 items-start">
          <div>
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
            <section className="space-y-3 mt-6 font-light">
              <div className="flex">
                <MapPin className="mr-2 shrink-0 " strokeWidth={1.5} />{" "}
                <span>{eventData.location}</span>
              </div>
              <div className="flex">
                <Calendar className="mr-2 shrink-0" strokeWidth={1.5} />{" "}
                <div>
                  {eventData.date
                    ? (() => {
                        const dateFormat = formatDateForDiv(eventData.date);

                        if (dateFormat.type === "single") {
                          return <span>{dateFormat.content as string}</span>;
                        }

                        // Multiple dates - structured format
                        const groupedDates = dateFormat.content as Record<
                          string,
                          Record<
                            string,
                            Array<{ day: string; isUpcoming: boolean }>
                          >
                        >;

                        return (
                          <div className="space-y-2">
                            {Object.entries(groupedDates).map(
                              ([year, months]) => (
                                <div key={year}>
                                  <div className="font-semibold text-lg">
                                    {year}
                                  </div>
                                  {Object.entries(months).map(
                                    ([month, days]) => (
                                      <div key={month} className="ml-2">
                                        <span className="font-medium">
                                          {month}:{" "}
                                        </span>
                                        <span>
                                          {days.map((dayObj, index) => (
                                            <span key={index}>
                                              {dayObj.isUpcoming ? (
                                                <strong className="font-bold text-primary">
                                                  {dayObj.day}
                                                </strong>
                                              ) : (
                                                dayObj.day
                                              )}
                                              {index < days.length - 1
                                                ? ", "
                                                : ""}
                                            </span>
                                          ))}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        );
                      })()
                    : "TBA"}
                </div>
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
          </div>
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
