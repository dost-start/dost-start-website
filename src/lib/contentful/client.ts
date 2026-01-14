/**
 * Contentful Client Configuration
 * 
 * This file sets up the Contentful client for fetching content.
 * 
 * Required environment variables:
 *   CONTENTFUL_SPACE_ID - Your Contentful space ID
 *   CONTENTFUL_ACCESS_TOKEN - Content Delivery API access token
 *   CONTENTFUL_PREVIEW_TOKEN - (Optional) Preview API token for draft content
 */

import { createClient, ContentfulClientApi, Entry, Asset } from "contentful";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const PREVIEW_TOKEN = process.env.CONTENTFUL_PREVIEW_TOKEN;

// Cache duration in seconds (1 hour for production, false to disable in development)
// Increased from 5 minutes to 1 hour for better performance
// Content is revalidated on-demand via webhook when updated in Contentful
export const CACHE_REVALIDATE_SECONDS: number | false = 
  process.env.NODE_ENV === "production" ? 3600 : false;

// ISR revalidation period for pages (1 hour)
export const ISR_REVALIDATE_SECONDS = 3600;

// Tags for cache invalidation
export const CACHE_TAGS = {
  events: "contentful-events",
  officers: "contentful-officers",
  terms: "contentful-terms",
  departments: "contentful-departments",
} as const;

if (!SPACE_ID || !ACCESS_TOKEN) {
  console.warn(
    "⚠️ Contentful environment variables not set. Falling back to local data."
  );
}

// Standard delivery client (published content only)
export const contentfulClient: ContentfulClientApi<undefined> | null =
  SPACE_ID && ACCESS_TOKEN
    ? createClient({
        space: SPACE_ID,
        accessToken: ACCESS_TOKEN,
      })
    : null;

// Preview client (includes draft content)
export const contentfulPreviewClient: ContentfulClientApi<undefined> | null =
  SPACE_ID && PREVIEW_TOKEN
    ? createClient({
        space: SPACE_ID,
        accessToken: PREVIEW_TOKEN,
        host: "preview.contentful.com",
      })
    : null;

// Helper to get the appropriate client
export function getClient(preview = false): ContentfulClientApi<undefined> | null {
  if (preview && contentfulPreviewClient) {
    return contentfulPreviewClient;
  }
  return contentfulClient;
}

// Helper to check if Contentful is configured
export function isContentfulConfigured(): boolean {
  return Boolean(SPACE_ID && ACCESS_TOKEN);
}

/**
 * Contentful Image API options for optimization
 */
interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "jpg" | "png" | "webp" | "avif";
  fit?: "pad" | "fill" | "scale" | "crop" | "thumb";
}

/**
 * Get optimized asset URL using Contentful Images API
 * @see https://www.contentful.com/developers/docs/references/images-api/
 */
export function getAssetUrl(asset: Asset | undefined, options?: ImageOptions): string {
  if (!asset?.fields?.file?.url) {
    return "/profile-placeholder.jpg";
  }
  
  let url = asset.fields.file.url;
  url = url.startsWith("//") ? `https:${url}` : url;
  
  // Apply Contentful Images API transformations if options provided
  if (options) {
    const params = new URLSearchParams();
    
    if (options.width) params.set("w", options.width.toString());
    if (options.height) params.set("h", options.height.toString());
    if (options.quality) params.set("q", options.quality.toString());
    if (options.format) params.set("fm", options.format);
    if (options.fit) params.set("fit", options.fit);
    
    const queryString = params.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  
  return url;
}

/**
 * Get optimized thumbnail URL (smaller size for cards/lists)
 */
export function getThumbnailUrl(asset: Asset | undefined): string {
  return getAssetUrl(asset, {
    width: 400,
    quality: 80,
    format: "webp",
  });
}

/**
 * Get optimized cover image URL (larger size for hero sections)
 */
export function getCoverImageUrl(asset: Asset | undefined): string {
  return getAssetUrl(asset, {
    width: 1200,
    quality: 85,
    format: "webp",
  });
}

/**
 * Get optimized profile image URL
 */
export function getProfileImageUrl(asset: Asset | undefined): string {
  return getAssetUrl(asset, {
    width: 300,
    height: 300,
    quality: 80,
    format: "webp",
    fit: "fill",
  });
}

// Helper to extract linked entry ID
export function getLinkedEntryId(
  entry: Entry<unknown> | { sys: { id: string } } | undefined
): string | null {
  if (!entry?.sys?.id) {
    return null;
  }
  return entry.sys.id;
}

// Types for content entries (to be used with includes resolution)
export interface ContentfulEntryFields {
  [key: string]: unknown;
}

export type ContentfulEntry<T extends ContentfulEntryFields> = Entry<T>;
