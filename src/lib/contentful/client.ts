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

// Helper to extract asset URL
export function getAssetUrl(asset: Asset | undefined): string {
  if (!asset?.fields?.file?.url) {
    return "/profile-placeholder.jpg";
  }
  const url = asset.fields.file.url;
  return url.startsWith("//") ? `https:${url}` : url;
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

