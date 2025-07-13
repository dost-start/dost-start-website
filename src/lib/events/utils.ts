import Event from "@/types/eventType";

/**
 * Gets the current date at midnight for consistent comparison
 */
function getCurrentDate(): Date {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

/**
 * Checks if an event is currently happening (has at least one date in the past and one in the future)
 */
function isCurrentEvent(event: Event): boolean {
  if (!event.date || !Array.isArray(event.date) || event.date.length <= 1) {
    return false;
  }

  const now = getCurrentDate();
  const hasPastDate = event.date.some((date) => {
    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < now;
  });

  const hasFutureDate = event.date.some((date) => {
    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= now;
  });

  return hasPastDate && hasFutureDate;
}

/**
 * Checks if an event is upcoming (all dates are in the future)
 */
function isUpcomingEvent(event: Event): boolean {
  if (!event.date) {
    return false;
  }

  const now = getCurrentDate();
  const dates = Array.isArray(event.date) ? event.date : [event.date];

  return dates.every((date) => {
    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= now;
  });
}

/**
 * Checks if an event is past (all dates are in the past)
 */
function isPastEvent(event: Event): boolean {
  if (!event.date) {
    return false;
  }

  const now = getCurrentDate();
  const dates = Array.isArray(event.date) ? event.date : [event.date];

  return dates.every((date) => {
    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < now;
  });
}

/**
 * Gets the earliest upcoming date for an event, useful for sorting
 */
function getEarliestUpcomingDate(event: Event): Date | null {
  if (!event.date) {
    return null;
  }

  const now = getCurrentDate();
  const dates = Array.isArray(event.date) ? event.date : [event.date];

  const upcomingDates = dates.filter((date) => {
    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate >= now;
  });

  if (upcomingDates.length === 0) {
    return null;
  }

  return new Date(Math.min(...upcomingDates.map((d) => d.getTime())));
}

/**
 * Gets the latest past date for an event, useful for sorting
 */
function getLatestPastDate(event: Event): Date | null {
  if (!event.date) {
    return null;
  }

  const now = getCurrentDate();
  const dates = Array.isArray(event.date) ? event.date : [event.date];

  const pastDates = dates.filter((date) => {
    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate < now;
  });

  if (pastDates.length === 0) {
    return null;
  }

  return new Date(Math.max(...pastDates.map((d) => d.getTime())));
}

// Export dynamically categorized events
export function getCategorizedEvents(events: Event[]) {
  const currentEvents = events.filter(isCurrentEvent).sort((a, b) => {
    const dateA = getEarliestUpcomingDate(a);
    const dateB = getEarliestUpcomingDate(b);

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    return dateA.getTime() - dateB.getTime();
  });

  const upcomingEvents = events.filter(isUpcomingEvent).sort((a, b) => {
    const dateA = getEarliestUpcomingDate(a);
    const dateB = getEarliestUpcomingDate(b);

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    return dateA.getTime() - dateB.getTime();
  });

  const pastEvents = events.filter(isPastEvent).sort((a, b) => {
    const dateA = getLatestPastDate(a);
    const dateB = getLatestPastDate(b);

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    return dateB.getTime() - dateA.getTime(); // Note: reversed order for past events
  });

  return {
    currentEvents,
    upcomingEvents,
    pastEvents,
  };
}
