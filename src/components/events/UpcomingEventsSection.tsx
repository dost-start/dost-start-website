"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import { Button } from "../ui/button";
import StartDivider from "../StartDivider";
import { upcomingEvents } from "@/lib/events/events";

export default function UpcomingEventsSection({
  className,
}: {
  className?: string;
}) {
  const [showAllUpcomingEvents, setShowAllUpcomingEvents] = useState(false);

  const upcomingEventsPreview = upcomingEvents.slice(0, 6);
  const upcomingEventsFull = upcomingEvents.slice(6);

  return (
    <section className={className}>
      <div className="flex items-center mb-6 gap-2">
        <h2 className="text-3xl font-bold shrink-0 mr-4">Upcoming Events</h2>
        <StartDivider variant="accent" width="10%" />
        <StartDivider variant="accent" width="20%" />
        <StartDivider variant="accent" width="50%" />
        <StartDivider variant="accent" width="20%" />
        <StartDivider variant="accent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-fit mx-auto">
        {upcomingEventsPreview.map((event, index) => (
          <EventCard
            key={`upcoming-event-${event.title}-${index}`}
            event={event}
            eventType="upcoming"
          />
        ))}
      </div>

      {!showAllUpcomingEvents && upcomingEventsFull.length > 0 && (
        <div
          className="flex items-center justify-center mt-10 cursor-pointer"
          onClick={() => setShowAllUpcomingEvents(true)}
        >
          <div className="w-full h-px bg-gray-400"></div>
          <Button variant="outline" size={"lg"} className="mx-4 cursor-pointer">
            See More
          </Button>
          <div className="w-full h-px bg-gray-400"></div>
        </div>
      )}

      {showAllUpcomingEvents && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-fit mx-auto mt-6">
          {upcomingEventsFull.map((event, index) => (
            <EventCard
              key={`upcoming-event-extra-${event.title}-${index}`}
              event={event}
              eventType="upcoming"
            />
          ))}
        </div>
      )}
    </section>
  );
}
