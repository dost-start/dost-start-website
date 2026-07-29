"use client";

import { useState } from "react";
import EventCard from "./EventCard";
import { Button } from "../ui/button";
import GlassSurface from "@/components/GlassSurface";
import Event from "@/types/eventType";

interface CurrentAndUpcomingEventsSectionProps {
  currentEvents: Event[];
  upcomingEvents: Event[];
  className?: string;
}

export default function CurrentAndUpcomingEventsSection({
  currentEvents,
  upcomingEvents,
  className,
}: CurrentAndUpcomingEventsSectionProps) {
  const [showAllUpcomingEvents, setShowAllUpcomingEvents] = useState(false);
  const hasCurrentEvents = currentEvents.length > 0;
  const hasUpcomingEvents = upcomingEvents.length > 0;

  // First block logic — current events when there are any, otherwise the upcoming ones
  const firstBlockSource = hasCurrentEvents ? currentEvents : upcomingEvents;
  const firstBlockEvents =
    !hasCurrentEvents && !showAllUpcomingEvents ? firstBlockSource.slice(0, 6) : firstBlockSource;
  const firstBlockTitle = hasCurrentEvents ? "Current Events" : "Upcoming Events";
  const firstBlockIsUpcoming = !hasCurrentEvents;
  const showSeeMoreForFirst =
    !hasCurrentEvents && !showAllUpcomingEvents && firstBlockSource.length > 6;

  // Second block logic — only rendered when there are both current and upcoming events
  const showSecondBlock = hasCurrentEvents && hasUpcomingEvents;
  const secondBlockEvents = !showAllUpcomingEvents ? upcomingEvents.slice(0, 6) : upcomingEvents;
  const showSeeMoreForSecond =
    showSecondBlock && !showAllUpcomingEvents && upcomingEvents.length > 6;

  const GlassBlock = ({
    title,
    events,
    className: blockClassName,
  }: {
    title: string;
    events: Event[];
    isUpcoming?: boolean;
    className?: string;
  }) => {
    const isUpcomingBlock = title === "Upcoming Events";
    const shouldScroll = isUpcomingBlock && events.length > 1;

    return (
      <div className={blockClassName}>
        <div className="relative flex justify-center w-full min-w-0 overflow-visible">
          <GlassSurface
            variant={"light"}
            width="100%"
            height="auto"
            borderRadius={20}
            matte
            style={{ boxShadow: 'none' }} 
            className="w-full max-w-8xl min-h-[420px] sm:min-h-[520px] md:min-h-[700px] relative overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 z-0 pointer-events-none rounded-[inherit]">
              <div
                className="absolute inset-0 rounded-[inherit] mix-blend-overlay"
                style={{
                  backgroundImage: "url(/texture.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.12,
                }}
              />
            </div>

            <div className="relative z-10 w-full h-full p-4 sm:p-6 lg:p-8">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold shrink-0 sm:pr-4">
                  {title}
                </h2>
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

              {shouldScroll ? (
                <div className="overflow-x-auto pb-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                  <div className="flex gap-4 sm:gap-6 w-max justify-center mx-auto min-w-full">
                    {events.map((event, index) => (
                      <div key={`${title}-${event.title}-${index}`} className="flex-shrink-0 w-[260px] sm:w-[280px]">
                        <EventCard event={event} eventType="upcoming" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 w-full max-w-6xl mx-auto">
                  {events.map((event, index) => (
                    <EventCard
                      key={`${title}-${event.title}-${index}`}
                      event={event}
                      eventType="upcoming"
                    />
                  ))}
                </div>
              )}
            </div>
          </GlassSurface>
        </div>
      </div>
    );
  };

  const SeeMoreButton = ({ onClick }: { onClick: () => void }) => (
    <div className="flex items-center justify-center mt-8 cursor-pointer group" onClick={onClick}>
      <div className="flex-1 h-px bg-foreground/10 group-hover:bg-foreground/20 transition-colors" />
      <Button variant="outline" size="lg" className="mx-4 cursor-pointer">
        See More
      </Button>
      <div className="flex-1 h-px bg-foreground/10 group-hover:bg-foreground/20 transition-colors" />
    </div>
  );

  // Nothing current and nothing upcoming — render neither block
  if (!hasCurrentEvents && !hasUpcomingEvents) {
    return null;
  }

  return (
    <section className={`${className} px-4 md:px-0`}>
      <GlassBlock
        title={firstBlockTitle}
        events={firstBlockEvents}
        isUpcoming={firstBlockIsUpcoming}
      />
      {showSeeMoreForFirst && <SeeMoreButton onClick={() => setShowAllUpcomingEvents(true)} />}

      {showSecondBlock && (
        <>
          <GlassBlock
            title="Upcoming Events"
            events={secondBlockEvents}
            isUpcoming={true}
            className="mt-10 sm:mt-14"
          />
          {showSeeMoreForSecond && <SeeMoreButton onClick={() => setShowAllUpcomingEvents(true)} />}
        </>
      )}
    </section>
  );
}