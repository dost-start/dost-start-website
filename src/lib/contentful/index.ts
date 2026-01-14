/**
 * Contentful Integration Module
 * 
 * This module provides functions to fetch content from Contentful CMS.
 * 
 * Environment Variables Required:
 *   CONTENTFUL_SPACE_ID - Your Contentful space ID
 *   CONTENTFUL_ACCESS_TOKEN - Content Delivery API access token
 *   CONTENTFUL_PREVIEW_TOKEN - (Optional) Preview API token for draft content
 * 
 * Usage:
 *   import { getAllEvents, getEventsByTerm, getOfficersByTerm } from "@/lib/contentful";
 */

// Client exports
export {
  contentfulClient,
  contentfulPreviewClient,
  getClient,
  isContentfulConfigured,
  getAssetUrl,
  getThumbnailUrl,
  getCoverImageUrl,
  getProfileImageUrl,
  CACHE_REVALIDATE_SECONDS,
  ISR_REVALIDATE_SECONDS,
  CACHE_TAGS,
} from "./client";

// Event functions
export {
  getAllEvents,
  getEventsByTerm,
  getEventBySlug,
  getAllTerms,
} from "./events";

// Officer functions
export {
  getOfficersByTerm,
  getAllBatchYears,
  getOfficerTerms,
} from "./officers";

// Types
export type {
  ContentfulTerm,
  ContentfulEvent,
  ContentfulOfficer,
  ContentfulDepartment,
  ContentfulDepartmentOfficer,
  Term,
  TransformedEvent,
  TransformedOfficer,
  TransformedDepartment,
  TransformedBatchYear,
} from "./types";

