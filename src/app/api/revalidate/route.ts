/**
 * On-Demand Revalidation API Route
 * 
 * This endpoint can be called by Contentful webhooks to invalidate
 * cached content when content is published/unpublished.
 * 
 * Setup in Contentful:
 * 1. Go to Settings → Webhooks
 * 2. Create a new webhook with URL: https://your-domain.com/api/revalidate
 * 3. Add header: x-revalidate-token = your-secret-token
 * 4. Select triggers: Entry publish, Entry unpublish, Asset publish, Asset unpublish
 */

import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CACHE_TAGS } from "@/lib/contentful/client";

// Secret token for webhook authentication
const REVALIDATE_TOKEN = process.env.REVALIDATE_SECRET_TOKEN;

interface ContentfulWebhookPayload {
  sys: {
    type: string;
    id: string;
    contentType?: {
      sys: {
        id: string;
      };
    };
  };
}

export async function POST(request: NextRequest) {
  try {
    // Verify the request token
    const token = request.headers.get("x-revalidate-token");
    
    // If REVALIDATE_TOKEN is configured, always require valid token
    if (REVALIDATE_TOKEN) {
      if (token !== REVALIDATE_TOKEN) {
        return NextResponse.json(
          { error: "Invalid token" },
          { status: 401 }
        );
      }
    } else {
      // Token not configured
      console.warn("REVALIDATE_SECRET_TOKEN not configured");
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { error: "Revalidation not configured" },
          { status: 500 }
        );
      }
      // In development without token configured, allow revalidation for easier testing
    }

    const body: ContentfulWebhookPayload = await request.json();
    const contentTypeId = body.sys.contentType?.sys.id;

    // Determine which cache tags to invalidate based on content type
    const tagsToRevalidate: string[] = [];

    switch (contentTypeId) {
      case "event":
        tagsToRevalidate.push(CACHE_TAGS.events);
        break;
      case "officer":
        tagsToRevalidate.push(CACHE_TAGS.officers);
        break;
      case "department":
        tagsToRevalidate.push(CACHE_TAGS.departments, CACHE_TAGS.officers);
        break;
      case "departmentOfficer":
        tagsToRevalidate.push(CACHE_TAGS.officers, CACHE_TAGS.departments);
        break;
      case "term":
        // Terms affect everything
        tagsToRevalidate.push(
          CACHE_TAGS.events,
          CACHE_TAGS.officers,
          CACHE_TAGS.departments,
          CACHE_TAGS.terms
        );
        break;
      default:
        // For assets or unknown types, revalidate everything
        tagsToRevalidate.push(
          CACHE_TAGS.events,
          CACHE_TAGS.officers,
          CACHE_TAGS.departments,
          CACHE_TAGS.terms
        );
    }

    // Revalidate the tags
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag);
    }

    console.log(`Revalidated tags: ${tagsToRevalidate.join(", ")}`);

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}

// Also support GET for manual testing
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const tag = request.nextUrl.searchParams.get("tag");

  // If REVALIDATE_TOKEN is configured, always require valid token
  if (REVALIDATE_TOKEN) {
    if (token !== REVALIDATE_TOKEN) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }
  } else {
    // Token not configured
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Revalidation not configured" },
        { status: 500 }
      );
    }
    // In development without token configured, allow revalidation for easier testing
  }

  // Revalidate specific tag or all tags
  const tagsToRevalidate = tag
    ? [tag]
    : Object.values(CACHE_TAGS);

  for (const t of tagsToRevalidate) {
    revalidateTag(t);
  }

  return NextResponse.json({
    revalidated: true,
    tags: tagsToRevalidate,
    timestamp: new Date().toISOString(),
  });
}

