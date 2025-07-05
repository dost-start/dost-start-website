import Event from "@/types/eventType";
import upcomingEvents from "./upcoming";
import pastEvents from "./past";
import gallery from "./gallery";
import currentEvents from "./current";

const eventsData: {
  upcomingEvents: Event[];
  pastEvents: Event[];
  currentEvents?: Event[];
  gallery: string[];
} = {
  upcomingEvents: upcomingEvents,
  pastEvents: pastEvents,
  currentEvents: currentEvents,
  gallery: gallery,
};

export default eventsData;
