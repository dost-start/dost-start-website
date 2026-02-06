"use client";
import Event from "@/types/eventType";
import StartDiv from "../StartDiv";
import StartDivider from "../StartDivider";
import EventCard from "./EventCard";
import { BackgroundGradient } from "../ui/background-gradient";

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
    <div className="sm:mx-2">
      <BackgroundGradient containerClassName="w-full" className="h-full">
        <StartDiv className="relative border-0 p-4 py-8 md:p-8 shadow-md bg-gradient-to-br from-primary/70 from-20% to-accent/70 z-30 overflow-hidden">
          <div
            className="h-full w-full absolute start-0 top-0 object-cover z-0"
            style={{
              backgroundImage: "url(/texture.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.2,
            }}
          ></div>
          
          {/* Content */}
          <div className="relative z-10 space-y-9">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-orbitron font-semibold text-foreground tracking-tight">
                {sectionTitle}
              </h2>
              <div className="flex gap-2 items-center">
                <StartDivider variant="accent" width="170px" />
                <StartDivider variant="accent" width="20px" />
                <StartDivider variant="accent" width="80px" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {eventsToShow.map((event, index) => (
                <EventCard
                  key={`current-or-upcoming-event-${event.title}-${index}`}
                  event={event}
                  eventType="upcoming"
                  className="shrink-0 mx-auto"
                />
              ))}
            </div>
          </div>
        </StartDiv>
      </BackgroundGradient>
    </div>
  );
}