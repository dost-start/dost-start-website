"use client";
import Event from "@/types/eventType";
import Image from "next/image";
import { CometCard } from "../ui/comet-card";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import placeholder from "../../../public/event-placeholder.png";

export default function EventCard({
  event,
  eventType,
  className,
}: {
  event: Event;
  eventType: "upcoming" | "past";
  className?: string;
}) {
  const router = useRouter();

  const formattedDate = event.date
    ? Array.isArray(event.date)
      ? (() => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const upcomingDate = event.date.find((date) => {
            const eventDate = new Date(date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today;
          });
          const dateToShow =
            upcomingDate || event.date[event.date.length - 1];
          return new Date(dateToShow).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            weekday: "long",
          });
        })()
      : new Date(event.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
          weekday: "long",
        })
    : "TBA";

  return (
    <CometCard
      className={cn(
        "max-w-sm w-full cursor-pointer h-full",
        className
      )}
    >
      <div
        className="rounded-2xl overflow-hidden bg-white flex flex-col h-full border border-gray-200/50 group"
        onClick={() => router.push(`/events/${event.slug}`)}
      >
        {/* Image Section with Gradient Overlay */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={event.eventDisplayImage ?? event.coverImage ?? placeholder}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            height={300}
            width={400}
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="px-6 py-5 space-y-4 flex-grow flex flex-col justify-between bg-gradient-to-b from-white to-gray-50/50">
          <div className="space-y-3">
            {/* Title */}
            <h3 className="text-xl font-bold font-orbitron line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300">
              {event.title}
            </h3>

            {/* Date */}
            <div className="flex items-start gap-2 text-sm">
              <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <p className="text-muted-foreground leading-relaxed">
                {formattedDate}
              </p>
            </div>

            {/* Location or Description */}
            {eventType === "upcoming" && event.location && (
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                  {event.location}
                </p>
              </div>
            )}
            {eventType === "past" && (
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {event.description}
              </p>
            )}
          </div>

          {/* Button */}
          <div className="pt-4 border-t border-gray-200/50">
            <Button 
              className="w-full group/btn" 
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/events/${event.slug}`);
              }}
            >
              <span className="flex items-center justify-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </CometCard>
  );
}
