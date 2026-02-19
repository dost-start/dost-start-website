"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import { Button } from "../ui/button";
import Event from "@/types/eventType";

interface PastEventsSectionProps {
  pastEvents: Event[];
  className?: string;
}

export default function PastEventsSection({
  pastEvents,
  className,
}: PastEventsSectionProps) {
  const [showAllPastEvents, setShowAllPastEvents] = useState(false);

  const pastEventsPreview = pastEvents.slice(0, 6);
  const pastEventsFull = pastEvents.slice(6);

  if (pastEvents.length === 0) return null;

  return (
    <section className={`${className} px-4 md:px-0`}>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold shrink-0 sm:pr-4">
          Past Events
        </h2>
        
        {/* Responsive Divider */}
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

      {/* Primary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 w-full max-w-7xl mx-auto">
        {pastEventsPreview.map((event, index) => (
          <EventCard
            key={`past-event-${event.title}-${index}`}
            event={event}
            eventType="past"
          />
        ))}
      </div>

      {/* See More Toggle */}
      {!showAllPastEvents && pastEventsFull.length > 0 && (
        <div
          className="flex items-center justify-center mt-12 cursor-pointer group"
          onClick={() => setShowAllPastEvents(true)}
        >
          <div className="flex-1 h-px bg-foreground/20 transition-colors group-hover:bg-foreground/40" />
          <Button variant="outline" size={"lg"} className="mx-4 cursor-pointer">
            See More
          </Button>
          <div className="flex-1 h-px bg-foreground/20 transition-colors group-hover:bg-foreground/40" />
        </div>
      )}

      {/* Extra Grid (Revealed on click) */}
      {showAllPastEvents && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 w-full max-w-7xl mx-auto mt-6">
          {pastEventsFull.map((event, index) => (
            <EventCard
              key={`past-event-extra-${event.title}-${index}`}
              event={event}
              eventType="past"
            />
          ))}
        </div>
      )}
    </section>
  );
}