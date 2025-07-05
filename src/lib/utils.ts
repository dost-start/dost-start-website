import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | Date[]) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  const formatSingleDate = (singleDate: Date) => {
    const parts = formatter.formatToParts(singleDate);
    const day = parts.find((p) => p.type === "day")?.value ?? "";
    const month = parts.find((p) => p.type === "month")?.value ?? "";
    const year = parts.find((p) => p.type === "year")?.value ?? "";
    const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
    return `${day} ${month} ${year}, ${weekday}`;
  };

  if (Array.isArray(date)) {
    return date.map(formatSingleDate).join(", ");
  }

  return formatSingleDate(date);
}

export function formatDateWithHighlight(date: Date | Date[]) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  const formatSingleDate = (singleDate: Date) => {
    const parts = formatter.formatToParts(singleDate);
    const day = parts.find((p) => p.type === "day")?.value ?? "";
    const month = parts.find((p) => p.type === "month")?.value ?? "";
    const year = parts.find((p) => p.type === "year")?.value ?? "";
    const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
    return `${day} ${month} ${year}, ${weekday}`;
  };

  if (Array.isArray(date)) {
    if (date.length === 1) {
      return formatSingleDate(date[0]);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingDateIndex = date.findIndex((dateItem) => {
      const eventDate = new Date(dateItem);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    });

    // Group dates by year and month
    const groupedDates = date.reduce((acc, dateItem, index) => {
      const parts = formatter.formatToParts(dateItem);
      const day = parts.find((p) => p.type === "day")?.value ?? "";
      const month = parts.find((p) => p.type === "month")?.value ?? "";
      const year = parts.find((p) => p.type === "year")?.value ?? "";

      if (!acc[year]) {
        acc[year] = {};
      }

      if (!acc[year][month]) {
        acc[year][month] = [];
      }

      const dayDisplay = index === upcomingDateIndex ? `**${day}**` : day;
      acc[year][month].push(dayDisplay);

      return acc;
    }, {} as Record<string, Record<string, string[]>>);

    // Format the grouped dates
    return Object.entries(groupedDates)
      .map(([year, months]) => {
        const monthsFormatted = Object.entries(months)
          .map(([month, days]) => {
            const daysString =
              days.length === 1 ? days[0] : `[${days.join(", ")}]`;
            return `${month} ${daysString}`;
          })
          .join(", ");
        return `${year}: ${monthsFormatted}`;
      })
      .join("; ");
  }

  return formatSingleDate(date);
}

export function formatDateForDiv(date: Date | Date[]) {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  });

  const formatSingleDate = (singleDate: Date) => {
    const parts = formatter.formatToParts(singleDate);
    const day = parts.find((p) => p.type === "day")?.value ?? "";
    const month = parts.find((p) => p.type === "month")?.value ?? "";
    const year = parts.find((p) => p.type === "year")?.value ?? "";
    const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
    return `${day} ${month} ${year}, ${weekday}`;
  };

  if (Array.isArray(date)) {
    if (date.length === 1) {
      return { type: "single", content: formatSingleDate(date[0]) };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingDateIndex = date.findIndex((dateItem) => {
      const eventDate = new Date(dateItem);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    });

    // Group dates by year and month
    const groupedDates = date.reduce((acc, dateItem, index) => {
      const parts = formatter.formatToParts(dateItem);
      const day = parts.find((p) => p.type === "day")?.value ?? "";
      const month = parts.find((p) => p.type === "month")?.value ?? "";
      const year = parts.find((p) => p.type === "year")?.value ?? "";

      if (!acc[year]) {
        acc[year] = {};
      }

      if (!acc[year][month]) {
        acc[year][month] = [];
      }

      acc[year][month].push({
        day,
        isUpcoming: index === upcomingDateIndex,
      });

      return acc;
    }, {} as Record<string, Record<string, Array<{ day: string; isUpcoming: boolean }>>>);

    return { type: "multiple", content: groupedDates };
  }

  return { type: "single", content: formatSingleDate(date) };
}
