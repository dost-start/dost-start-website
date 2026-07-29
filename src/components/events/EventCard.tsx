import Event from "@/types/eventType";
import Image from "next/image";
import Link from "next/link";
import { CometCard } from "../ui/comet-card";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
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
  const truncateText = (text: string, maxChars: number) => {
    const normalized = (text ?? "").trim();
    if (normalized.length <= maxChars) return normalized;
    return `${normalized.slice(0, Math.max(0, maxChars - 1)).trimEnd()}…`;
  };

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
          const dateToShow = upcomingDate || event.date[event.date.length - 1];
          return new Date(dateToShow).toLocaleDateString("en-US", {
            day: "numeric", month: "long", year: "numeric", weekday: "long",
          });
        })()
      : new Date(event.date).toLocaleDateString("en-US", {
          day: "numeric", month: "long", year: "numeric", weekday: "long",
        })
    : "TBA";

  return (
    <CometCard
      className={cn(
        "max-w-sm w-full cursor-pointer h-full group p-[1px]", 
        className
      )}
    >
      {/* IDLE STATE: Neutral gray border and very faint white/gray shadow.
          HOVER STATE: Switches to Primary Blue glow and border.
      */}
      <Link
        href={`/events/${event.slug}`}
        aria-label={event.title}
        className={cn(
          "rounded-2xl overflow-hidden bg-white flex flex-col h-full transition-all duration-500 relative z-10",
          // Idle: Subtle neutral outline
          "border border-gray-200 shadow-[0_0_10px_rgba(0,0,0,0.03)]",
          // Hover / keyboard focus: Primary blue glow
          "group-hover:border-primary/50 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]",
          "focus-visible:border-primary/50 focus-visible:shadow-[0_0_25px_rgba(59,130,246,0.35)]",
          "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
      >
        {/* Image Section */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={event.eventDisplayImage ?? event.coverImage ?? placeholder}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            height={300}
            width={400}
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="px-6 py-5 space-y-4 flex-grow flex flex-col justify-between bg-gradient-to-b from-white to-gray-50/30 min-h-[220px]">
          <div className="space-y-3">
            <h3 className="text-xl font-bold font-orbitron line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-300">
              {event.title}
            </h3>

            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <p className="text-muted-foreground leading-relaxed">
                  {formattedDate}
                </p>
              </div>

              <div className="min-h-[40px] flex flex-col gap-2">
                {eventType === "upcoming" && event.location && (
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                      {truncateText(event.location, 90)}
                    </p>
                  </div>
                )}
                {eventType === "past" && (
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {truncateText(event.description, 160)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Call to action — visual only; the whole card is the link */}
          <div className="pt-4 border-t border-gray-100">
            <span
              className={cn(
                buttonVariants({ variant: "accent", size: "lg" }),
                "w-full rounded-full h-11 text-base font-medium border-2 border-white transition-all duration-300",
                "shadow-sm group-hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)]"
              )}
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </CometCard>
  );
}