/**
 * Contentful Event Functions
 * 
 * Functions to fetch and transform events from Contentful
 * Includes caching and image optimization
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { Asset } from "contentful";
import { 
  getClient, 
  getCoverImageUrl, 
  getThumbnailUrl, 
  getAssetUrl,
  isContentfulConfigured,
  CACHE_REVALIDATE_SECONDS,
  CACHE_TAGS,
} from "./client";
import Event from "@/types/eventType";

// Transform Contentful event to local Event type
function transformEvent(entry: any): Event & { termName: string } {
  const fields = entry.fields;
  
  return {
    title: fields.title,
    slug: fields.slug,
    description: fields.description,
    tags: fields.tags || [],
    location: fields.location,
    date: fields.dates?.map((d: string) => new Date(d)) || [],
    startingTime: fields.startingTime,
    endingTime: fields.endingTime,
    registrationLink: fields.registrationLink,
    socialLinks: {
      facebook: fields.facebookLink,
      instagram: fields.instagramLink,
      website: fields.websiteLink,
    },
    hashtags: fields.hashtags || [],
    coverImage: getCoverImageUrl(fields.coverImage as Asset),
    eventDisplayImage: getThumbnailUrl(fields.eventDisplayImage as Asset),
    images: fields.galleryImages?.map((img: Asset) => 
      getAssetUrl(img, { width: 800, quality: 85, format: "webp" })
    ),
    termName: fields.term?.fields?.name || "Unknown",
  };
}

/**
 * Get the earliest date from an event for sorting purposes
 * Handles both Date objects and ISO strings (after cache serialization)
 */
function getEarliestDate(event: Event): Date {
  if (!event.date) return new Date(0);
  const dates = Array.isArray(event.date) ? event.date : [event.date];
  if (dates.length === 0) return new Date(0);
  
  const timestamps = dates.map(d => {
    // Handle both Date objects and strings (from cache serialization)
    if (d instanceof Date) return d.getTime();
    if (typeof d === 'string' || typeof d === 'number') return new Date(d).getTime();
    return 0;
  });
  
  return new Date(Math.min(...timestamps));
}

/**
 * Sort events by their earliest date (newest first)
 */
function sortEventsByDate<T extends Event>(events: T[]): T[] {
  return [...events].sort((a, b) => {
    const dateA = getEarliestDate(a);
    const dateB = getEarliestDate(b);
    const timeA = dateA.getTime() || 0;
    const timeB = dateB.getTime() || 0;
    return timeB - timeA;
  });
}

/**
 * Internal function to fetch all events
 */
async function fetchAllEventsInternal(preview: boolean): Promise<(Event & { termName: string })[]> {
  const client = getClient(preview);
  if (!client) return [];

  const response = await client.getEntries({
    content_type: "event",
    include: 2,
    limit: 100,
  });

  const events = response.items.map(transformEvent);
  return sortEventsByDate(events);
}

/**
 * Cached version of fetchAllEventsInternal
 */
const getCachedAllEvents = unstable_cache(
  async (preview: boolean) => fetchAllEventsInternal(preview),
  ["contentful-all-events"],
  {
    revalidate: CACHE_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.events],
  }
);

/**
 * Get all events from Contentful (with caching)
 */
export const getAllEvents = cache(async (preview = false): Promise<(Event & { termName: string })[]> => {
  if (!isContentfulConfigured()) {
    console.warn("Contentful not configured, returning empty array");
    return [];
  }

  try {
    return await getCachedAllEvents(preview);
  } catch (error) {
    console.error("Error fetching events from Contentful:", error);
    return [];
  }
});

/**
 * Internal function to fetch events by term
 */
async function fetchEventsByTermInternal(
  termName: string,
  preview: boolean
): Promise<Event[]> {
  const client = getClient(preview);
  if (!client) return [];

  // Find the term ID
  const termsResponse = await client.getEntries({
    content_type: "term",
    "fields.name": termName,
    limit: 1,
  });

  if (termsResponse.items.length === 0) {
    console.warn(`Term "${termName}" not found`);
    return [];
  }

  const termId = termsResponse.items[0].sys.id;

  const response = await client.getEntries({
    content_type: "event",
    "fields.term.sys.id": termId,
    include: 2,
  });

  const events = response.items.map(transformEvent);
  return sortEventsByDate(events);
}

/**
 * Get events by term (with caching)
 */
export const getEventsByTerm = cache(async (
  termName: string,
  preview = false
): Promise<Event[]> => {
  if (!isContentfulConfigured()) {
    console.warn("Contentful not configured, returning empty array");
    return [];
  }

  try {
    const getCachedEventsByTerm = unstable_cache(
      async () => fetchEventsByTermInternal(termName, preview),
      [`contentful-events-term-${termName}`],
      {
        revalidate: CACHE_REVALIDATE_SECONDS,
        tags: [CACHE_TAGS.events, CACHE_TAGS.terms],
      }
    );
    
    return await getCachedEventsByTerm();
  } catch (error) {
    console.error("Error fetching events by term from Contentful:", error);
    return [];
  }
});

/**
 * Get a single event by slug (with caching)
 */
export const getEventBySlug = cache(async (
  slug: string,
  preview = false
): Promise<(Event & { termName: string }) | null> => {
  const client = getClient(preview);
  
  if (!client || !isContentfulConfigured()) {
    console.warn("Contentful not configured, returning null");
    return null;
  }

  try {
    const getCachedEventBySlug = unstable_cache(
      async () => {
        const response = await client.getEntries({
          content_type: "event",
          "fields.slug": slug,
          include: 2,
          limit: 1,
        });

        if (response.items.length === 0) {
          return null;
        }

        return transformEvent(response.items[0]);
      },
      [`contentful-event-${slug}`],
      {
        revalidate: CACHE_REVALIDATE_SECONDS,
        tags: [CACHE_TAGS.events],
      }
    );

    return await getCachedEventBySlug();
  } catch (error) {
    console.error("Error fetching event by slug from Contentful:", error);
    return null;
  }
});

/**
 * Get all available terms (with caching)
 */
export const getAllTerms = cache(async (
  preview = false
): Promise<{ id: string; name: string; isActive: boolean }[]> => {
  const client = getClient(preview);
  
  if (!client || !isContentfulConfigured()) {
    return [];
  }

  try {
    const getCachedTerms = unstable_cache(
      async () => {
        const response = await client.getEntries({
          content_type: "term",
          order: ["-fields.name"],
          select: ["sys.id", "fields.name", "fields.isActive"],
        });

        return response.items.map((item: any) => ({
          id: item.sys.id,
          name: item.fields.name,
          isActive: item.fields.isActive,
        }));
      },
      ["contentful-all-terms"],
      {
        revalidate: CACHE_REVALIDATE_SECONDS,
        tags: [CACHE_TAGS.terms],
      }
    );

    return await getCachedTerms();
  } catch (error) {
    console.error("Error fetching terms from Contentful:", error);
    return [];
  }
});
