/**
 * Contentful Event Functions
 * 
 * Functions to fetch and transform events from Contentful
 */

import { Entry, Asset, EntryCollection } from "contentful";
import { getClient, getAssetUrl, isContentfulConfigured } from "./client";
import Event from "@/types/eventType";

// Contentful event fields type
interface ContentfulEventFields {
  title: string;
  slug: string;
  description: string;
  tags?: string[];
  location?: string;
  dates: string[];
  startingTime?: string;
  endingTime?: string;
  registrationLink?: string;
  facebookLink?: string;
  instagramLink?: string;
  websiteLink?: string;
  hashtags?: string[];
  coverImage: Asset;
  eventDisplayImage: Asset;
  galleryImages?: Asset[];
  term: Entry<{ name: string }>;
}

// Transform Contentful event to local Event type
function transformEvent(entry: Entry<ContentfulEventFields>): Event & { termName: string } {
  const fields = entry.fields;
  
  return {
    title: fields.title,
    slug: fields.slug,
    description: fields.description,
    tags: fields.tags || [],
    location: fields.location,
    date: fields.dates.map((d: string) => new Date(d)),
    startingTime: fields.startingTime,
    endingTime: fields.endingTime,
    registrationLink: fields.registrationLink,
    socialLinks: {
      facebook: fields.facebookLink,
      instagram: fields.instagramLink,
      website: fields.websiteLink,
    },
    hashtags: fields.hashtags || [],
    coverImage: getAssetUrl(fields.coverImage),
    eventDisplayImage: getAssetUrl(fields.eventDisplayImage),
    images: fields.galleryImages?.map((img: Asset) => getAssetUrl(img)),
    termName: (fields.term?.fields?.name as string) || "Unknown",
  };
}

/**
 * Get the earliest date from an event for sorting purposes
 */
function getEarliestDate(event: Event): Date {
  if (!event.date) return new Date(0);
  const dates = Array.isArray(event.date) ? event.date : [event.date];
  if (dates.length === 0) return new Date(0);
  return new Date(Math.min(...dates.map(d => new Date(d).getTime())));
}

/**
 * Sort events by their earliest date (newest first)
 */
function sortEventsByDate<T extends Event>(events: T[]): T[] {
  return [...events].sort((a, b) => {
    const dateA = getEarliestDate(a);
    const dateB = getEarliestDate(b);
    return dateB.getTime() - dateA.getTime(); // Descending (newest first)
  });
}

/**
 * Get all events from Contentful
 */
export async function getAllEvents(preview = false): Promise<(Event & { termName: string })[]> {
  const client = getClient(preview);
  
  if (!client || !isContentfulConfigured()) {
    console.warn("Contentful not configured, returning empty array");
    return [];
  }

  try {
    // Note: Can't order by array field 'dates', so we sort in JS after fetching
    const response: EntryCollection<ContentfulEventFields> = await client.getEntries({
      content_type: "event",
      include: 2, // Include linked entries (term)
    });

    const events = response.items.map(transformEvent);
    return sortEventsByDate(events);
  } catch (error) {
    console.error("Error fetching events from Contentful:", error);
    return [];
  }
}

/**
 * Get events by term
 */
export async function getEventsByTerm(
  termName: string,
  preview = false
): Promise<Event[]> {
  const client = getClient(preview);
  
  if (!client || !isContentfulConfigured()) {
    console.warn("Contentful not configured, returning empty array");
    return [];
  }

  try {
    // First, find the term ID
    const termsResponse = await client.getEntries<{ name: string }>({
      content_type: "term",
      "fields.name": termName,
      limit: 1,
    });

    if (termsResponse.items.length === 0) {
      console.warn(`Term "${termName}" not found`);
      return [];
    }

    const termId = termsResponse.items[0].sys.id;

    // Note: Can't order by array field 'dates', so we sort in JS after fetching
    const response: EntryCollection<ContentfulEventFields> = await client.getEntries({
      content_type: "event",
      "fields.term.sys.id": termId,
      include: 2,
    });

    const events = response.items.map(transformEvent);
    return sortEventsByDate(events);
  } catch (error) {
    console.error("Error fetching events by term from Contentful:", error);
    return [];
  }
}

/**
 * Get a single event by slug
 */
export async function getEventBySlug(
  slug: string,
  preview = false
): Promise<(Event & { termName: string }) | null> {
  const client = getClient(preview);
  
  if (!client || !isContentfulConfigured()) {
    console.warn("Contentful not configured, returning null");
    return null;
  }

  try {
    const response: EntryCollection<ContentfulEventFields> = await client.getEntries({
      content_type: "event",
      "fields.slug": slug,
      include: 2,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    return transformEvent(response.items[0]);
  } catch (error) {
    console.error("Error fetching event by slug from Contentful:", error);
    return null;
  }
}

/**
 * Get all available terms
 */
export async function getAllTerms(
  preview = false
): Promise<{ id: string; name: string; isActive: boolean }[]> {
  const client = getClient(preview);
  
  if (!client || !isContentfulConfigured()) {
    return [];
  }

  try {
    interface TermFields {
      name: string;
      isActive: boolean;
    }
    
    const response: EntryCollection<TermFields> = await client.getEntries({
      content_type: "term",
      order: ["-fields.name"],
    });

    return response.items.map((item) => ({
      id: item.sys.id,
      name: item.fields.name,
      isActive: item.fields.isActive,
    }));
  } catch (error) {
    console.error("Error fetching terms from Contentful:", error);
    return [];
  }
}
