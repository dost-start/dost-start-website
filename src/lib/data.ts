/**
 * Unified Data Layer
 * 
 * This module provides a unified interface for fetching data from Contentful
 * with automatic fallback to local static data when Contentful is not configured.
 */

import { isContentfulConfigured } from "./contentful/client";
import {
  getAllEvents as contentfulGetAllEvents,
  getEventsByTerm as contentfulGetEventsByTerm,
  getEventBySlug as contentfulGetEventBySlug,
  getAllTerms as contentfulGetAllTerms,
} from "./contentful/events";
import {
  getOfficersByTerm as contentfulGetOfficersByTerm,
  getAllBatchYears as contentfulGetAllBatchYears,
} from "./contentful/officers";

// Local data imports (fallback)
import { allEvents } from "./events/events";
import { getCategorizedEvents } from "./events/utils";
import officerBatchYears from "./officers/index";

import Event from "@/types/eventType";
import { BatchYear, BatchYears } from "@/types/officerType";

// ============================================
// EVENTS DATA FUNCTIONS
// ============================================

interface CategorizedEvents {
  currentEvents: Event[];
  upcomingEvents: Event[];
  pastEvents: Event[];
}

/**
 * Get categorized events data (current, upcoming, past)
 * Fetches from Contentful if configured, otherwise uses local data
 */
export async function getCategorizedEventsData(
  term?: string
): Promise<CategorizedEvents> {
  if (isContentfulConfigured()) {
    try {
      let events: Event[];
      
      if (term) {
        // Fetch events for specific term
        events = await contentfulGetEventsByTerm(term);
      } else {
        // Fetch all events (will filter by active term or all)
        const allContentfulEvents = await contentfulGetAllEvents();
        events = allContentfulEvents;
      }

      // Apply categorization logic
      return getCategorizedEvents(events);
    } catch (error) {
      console.error("Error fetching from Contentful, falling back to local data:", error);
    }
  }

  // Fallback to local data
  return getCategorizedEvents(allEvents);
}

/**
 * Get all available terms for filtering events
 */
export async function getEventTerms(): Promise<
  { id: string; name: string; isActive: boolean }[]
> {
  if (isContentfulConfigured()) {
    try {
      const terms = await contentfulGetAllTerms();
      if (terms.length > 0) {
        return terms;
      }
    } catch (error) {
      console.error("Error fetching terms from Contentful:", error);
    }
  }

  // Fallback: return single term based on local data
  return [
    {
      id: "local-2024-2025",
      name: "2024-2025",
      isActive: true,
    },
  ];
}

/**
 * Get a single event by slug
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  if (isContentfulConfigured()) {
    try {
      const event = await contentfulGetEventBySlug(slug);
      if (event) {
        return event;
      }
    } catch (error) {
      console.error("Error fetching event from Contentful:", error);
    }
  }

  // Fallback to local data
  return allEvents.find((event) => event.slug === slug) || null;
}

/**
 * Get all event slugs for static generation
 */
export async function getAllEventSlugs(): Promise<string[]> {
  if (isContentfulConfigured()) {
    try {
      const events = await contentfulGetAllEvents();
      if (events.length > 0) {
        return events.map((event) => event.slug);
      }
    } catch (error) {
      console.error("Error fetching event slugs from Contentful:", error);
    }
  }

  // Fallback to local data
  return allEvents.map((event) => event.slug);
}

// ============================================
// OFFICERS DATA FUNCTIONS
// ============================================

/**
 * Get officers by term
 */
export async function getOfficersByTerm(
  termName: string
): Promise<BatchYear | null> {
  if (isContentfulConfigured()) {
    try {
      const batchYear = await contentfulGetOfficersByTerm(termName);
      if (batchYear && batchYear.departments.length > 0) {
        return batchYear;
      }
    } catch (error) {
      console.error("Error fetching officers from Contentful:", error);
    }
  }

  // Fallback to local data
  return (
    officerBatchYears.batchYears.find((batch) => batch.year === termName) ||
    null
  );
}

/**
 * Get all batch years with officers
 */
export async function getAllBatchYears(): Promise<BatchYears> {
  if (isContentfulConfigured()) {
    try {
      const batchYears = await contentfulGetAllBatchYears();
      const filtered = {
        ...batchYears,
        batchYears: batchYears.batchYears.filter(
          (b) => b.departments && b.departments.length > 0
        ),
      };

      if (filtered.batchYears.length > 0) {
        return filtered;
      }
    } catch (error) {
      console.error("Error fetching batch years from Contentful:", error);
    }
  }

  // Fallback to local data
  return {
    ...officerBatchYears,
    batchYears: officerBatchYears.batchYears.filter(
      (b) => b.departments && b.departments.length > 0
    ),
  };
}

/**
 * Get all officer params for static generation
 * Returns array of { year, department } combinations
 */
export async function getAllOfficerParams(): Promise<
  { year: string; department: string }[]
> {
  const batchYears = await getAllBatchYears();
  const params: { year: string; department: string }[] = [];

  for (const batchYear of batchYears.batchYears) {
    for (const department of batchYear.departments) {
      params.push({
        year: batchYear.year,
        department: department.tabName,
      });
    }
  }

  return params;
}

/**
 * Get the default officer page path (most recent term, first department)
 */
export async function getDefaultOfficerPath(): Promise<string> {
  const batchYears = await getAllBatchYears();

  if (batchYears.batchYears.length === 0) {
    return "/officers/2024-2025/Executive";
  }

  // Get the most recent batch year (first in the sorted list) that has departments
  const latestBatch = batchYears.batchYears.find(
    (b) => b.departments && b.departments.length > 0
  );

  const firstDepartment = latestBatch?.departments?.[0];

  if (!latestBatch || !firstDepartment?.tabName) {
    return "/officers/2024-2025/Executive";
  }

  return `/officers/${latestBatch.year}/${firstDepartment.tabName}`;
}

