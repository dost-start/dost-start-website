"use client";
import Event from "@/types/eventType";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
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
        "max-w-sm rounded-2xl shadow-lg overflow-hidden border-4 relative md:[aspect-ratio:0.8] w-full cursor-pointer hover:scale-105 transition-all",
        className
      )}
      onClick={() => router.push(`/events/${event.slug}`)}
    >
      <Image
        src={event.coverImage ?? placeholder}
        alt={event.title}
        className="w-full h-[55%] object-cover"
        height={200}
        width={200}
      />
      <CardContent className="px-4 py-2 space-y-2">
        <h3 className="text-lg font-semibold line-clamp-2">{event.title}</h3>
        <div className="flex items-center text-sm text-gray-600 line-clamp-1">
          <Calendar className="w-4 h-4 mr-2 shrink-0" />
          <p className="line-clamp-1">
            {event.date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
              weekday: "long",
            })}
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
      </CardContent>
      <CardFooter className="-ml-2 md:absolute md:bottom-0">
        <Button asChild>
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More <ArrowRight />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
