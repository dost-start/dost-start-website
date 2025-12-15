"use client";
import Event from "@/types/eventType";
import StartDiv from "../StartDiv";
import StartDivider from "../StartDivider";
import EventCard from "./EventCard";

interface CurrentEventsSectionProps {
  currentEvents: Event[];
  upcomingEvents: Event[];
}

export default function CurrentEventsSection({
  currentEvents,
  upcomingEvents,
}: CurrentEventsSectionProps) {
  // When there are no current events, show upcoming events instead
  const eventsToShow =
    currentEvents.length > 0 ? currentEvents : upcomingEvents.slice(0, 3);
  const sectionTitle =
    currentEvents.length > 0 ? "Current Events" : "Upcoming Events";

  // Don't render anything if there are no events to show
  if (eventsToShow.length === 0) {
    return null;
  }

  return (
    <StartDiv className="relative border md:border-4 p-2 py-8 sm:mx-2 md:p-8 shadow-xl bg-gradient-to-br from-primary/70 from-20% to-accent/70 z-30 overflow-hidden">
      <div
        className="h-full w-full absolute start-0 top-0 object-cover z-0"
        style={{
          backgroundImage: "url(/texture.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
      ></div>
      <h2 className="text-4xl font-bold relative z-10">{sectionTitle}</h2>
      <div className="flex gap-2 my-4">
        <StartDivider variant="accent" width="170px" />
        <StartDivider variant="accent" width="20px" />
        <StartDivider variant="accent" width="80px" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {eventsToShow.map((event, index) => (
          <EventCard
            key={`current-or-upcoming-event-${event.title}-${index}`}
            event={event}
            eventType="upcoming"
            className="shrink-0 mx-auto"
          />
        ))}
      </div>
    </StartDiv>
  );
}
