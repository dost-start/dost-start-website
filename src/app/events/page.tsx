import EventCard from "@/components/events/EventCard";
import Gallery from "@/components/events/gallery";
import PastEventsSection from "@/components/events/PastEventsSection";
import PageTitle from "@/components/PageTitle";
import StartDiv from "@/components/StartDiv";
import StartDivider from "@/components/StartDivider";
import upcomingEvents from "@/lib/events/upcoming";

export default function Page() {
  return (
    <div>
      <PageTitle text="Events" />
      <StartDiv className="relative border md:border-4 p-2 py-8 sm:mx-2 md:p-8 shadow-xl bg-gradient-to-br from-primary/70 from-20% to-accent/70 z-50 overflow-hidden">
        <div
          className="h-full w-full absolute start-0 top-0 object-cover z-0"
          style={{
            backgroundImage: "url(/texture.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        ></div>
        <h2 className="text-4xl font-bold relative z-10">Upcoming Events</h2>
        <div className="flex gap-2 my-4">
          <StartDivider variant="accent" width="180px" />
          <StartDivider variant="accent" width="20px" />
          <StartDivider variant="accent" width="100px" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {upcomingEvents.map((event, index) => (
            <EventCard
              key={`upcoming-event-${event.title}-${index}`}
              event={event}
              eventType="upcoming"
              className="shrink-0 mx-auto"
            />
          ))}
        </div>
      </StartDiv>

      <section className="m-2 mt-14 sm:px-10">
        <PastEventsSection />

        <Gallery className="mt-14" />
      </section>
    </div>
  );
}
