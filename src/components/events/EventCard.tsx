"use client";
import Event from "@/types/eventType";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
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

  return (
    <Card
      className={cn(
        "max-w-sm rounded-2xl shadow-lg overflow-hidden border-4 relative w-full cursor-pointer hover:scale-105 transition-all flex flex-col h-full",
        className
      )}
      onClick={() => router.push(`/events/${event.slug}`)}
    >
      <div className="w-full aspect-square overflow-hidden">
        <Image
          src={event.eventDisplayImage ?? event.coverImage ?? placeholder}
          alt={event.title}
          className="w-full h-full object-cover"
          height={300}
          width={300}
        />
      </div>
      <CardContent className="px-4 py-2 space-y-2 flex-grow flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold line-clamp-2">{event.title}</h3>
          <div className="flex items-center text-sm text-gray-600 line-clamp-1">
            <Calendar className="w-4 h-4 mr-2 shrink-0" />
            <p className="line-clamp-1">
              {event.date
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
                      return dateToShow.toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        weekday: "long",
                      });
                    })()
                  : event.date.toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      weekday: "long",
                    })
                : "TBA"}
            </p>
          </div>
          {eventType === "upcoming" && (
            <div className="flex items-center text-sm text-gray-600 ">
              <MapPin className="w-4 h-4 mr-2 shrink-0" />
              <p className="line-clamp-1">{event.location}</p>
            </div>
          )}
          {eventType === "past" && (
            <div className="flex items-center text-sm text-gray-600 ">
              <p className="line-clamp-2">{event.description}</p>
            </div>
          )}
        </div>
        <div className="pt-2 mb-4">
          <Button asChild onClick={() => router.push(`/events/${event.slug}`)}>
            <span>
              Learn More <ArrowRight />
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
