import Event from "@/types/eventType";
import upcomingEvents from "./upcoming";
import pastEvents from "./past";
import gallery from "./gallery";

const eventsData: {
  upcomingEvents: Event[];
  pastEvents: Event[];
  gallery: string[];
} = {
  upcomingEvents: upcomingEvents,
  pastEvents: pastEvents,
  gallery: gallery,
};

export default eventsData;
