/**
 * Contentful Data Migration Script
 * 
 * This script migrates existing events and officers data from the codebase to Contentful.
 * 
 * Usage:
 *   npx tsx scripts/contentful/migrate-data.ts
 * 
 * Required environment variables:
 *   CONTENTFUL_SPACE_ID - Your Contentful space ID
 *   CONTENTFUL_MANAGEMENT_TOKEN - Management API token (with write access)
 *   CONTENTFUL_ENVIRONMENT - Environment name (default: "master")
 */

import {
  createClient,
  ClientAPI,
  Environment,
  Entry,
  Asset,
} from "contentful-management";

// Import existing data
import { allEvents } from "../../src/lib/events/events";
import officerBatchYears from "../../src/lib/officers/index";
import Event from "../../src/types/eventType";
import { Department, Officer } from "../../src/types/officerType";

// Configuration
import * as dotenv from "dotenv";
dotenv.config();

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";
const DEFAULT_LOCALE = "en-US";

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error("❌ Missing required environment variables:");
  console.error("   CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN are required.");
  process.exit(1);
}

// Helper to create a link reference
function createLink(id: string, linkType: "Entry" | "Asset" = "Entry") {
  return {
    sys: {
      type: "Link" as const,
      linkType,
      id,
    },
  };
}

// Helper to wrap value with locale
function localized<T>(value: T): { [key: string]: T } {
  return { [DEFAULT_LOCALE]: value };
}

// Helper to generate a URL-safe ID
function generateId(prefix: string, name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 40);
  return `${prefix}-${slug}`;
}

// Cache for created assets and entries
const assetCache: Map<string, string> = new Map();
const entryCache: Map<string, string> = new Map();

async function getEnvironment(client: ClientAPI): Promise<Environment> {
  const space = await client.getSpace(SPACE_ID!);
  return space.getEnvironment(ENVIRONMENT_ID);
}

async function createOrGetAsset(
  environment: Environment,
  url: string,
  title: string
): Promise<string> {
  // Check cache first
  if (assetCache.has(url)) {
    return assetCache.get(url)!;
  }

  // Check if asset already exists by URL
  const existingAssets = await environment.getAssets({
    "fields.file.url": url.replace("https:", "").replace("http:", ""),
    limit: 1,
  });

  if (existingAssets.items.length > 0) {
    const assetId = existingAssets.items[0].sys.id;
    assetCache.set(url, assetId);
    return assetId;
  }

  // Create new asset with external URL
  const assetId = generateId("asset", title);
  
  try {
    // For external URLs (like Cloudinary), we'll create an asset with the URL
    const asset = await environment.createAsset({
      fields: {
        title: localized(title),
        file: localized({
          contentType: "image/jpeg",
          fileName: `${title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.jpg`,
          upload: url,
        }),
      },
    });

    // Process and publish the asset
    try {
      const processedAsset = await asset.processForAllLocales();
      // Wait a bit for processing to complete
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      // Fetch the asset again to get updated state
      const refreshedAsset = await environment.getAsset(processedAsset.sys.id);
      await refreshedAsset.publish();
      
      assetCache.set(url, refreshedAsset.sys.id);
      return refreshedAsset.sys.id;
    } catch (processError) {
      console.log(`   ⚠️  Asset processing in progress, returning ID: ${asset.sys.id}`);
      assetCache.set(url, asset.sys.id);
      return asset.sys.id;
    }
  } catch (error) {
    console.error(`   ❌ Failed to create asset for ${url}:`, error);
    throw error;
  }
}

async function createTerm(
  environment: Environment,
  year: string
): Promise<string> {
  const termId = `term-${year}`;
  
  // Check cache
  if (entryCache.has(termId)) {
    return entryCache.get(termId)!;
  }

  // Check if term already exists
  try {
    const existing = await environment.getEntry(termId);
    entryCache.set(termId, existing.sys.id);
    return existing.sys.id;
  } catch {
    // Term doesn't exist, create it
  }

  console.log(`\n📅 Creating term: ${year}`);
  
  // Parse year to get dates
  const [startYear, endYear] = year.split("-").map(Number);
  
  const entry = await environment.createEntryWithId("term", termId, {
    fields: {
      name: localized(year),
      startDate: localized(`${startYear}-07-01T00:00:00.000Z`),
      endDate: localized(`${endYear}-06-30T23:59:59.000Z`),
      isActive: localized(year === "2024-2025"), // Current term is active
    },
  });

  await entry.publish();
  console.log(`   ✅ Created term: ${year}`);
  
  entryCache.set(termId, entry.sys.id);
  return entry.sys.id;
}

async function migrateEvent(
  environment: Environment,
  event: Event,
  termId: string
): Promise<void> {
  const eventId = generateId("event", event.slug);
  
  // Check if event already exists
  try {
    await environment.getEntry(eventId);
    console.log(`   ⏭️  Event already exists: ${event.title}`);
    return;
  } catch {
    // Event doesn't exist, create it
  }

  console.log(`\n📅 Creating event: ${event.title}`);

  // Create assets for images
  console.log(`   📷 Creating cover image asset...`);
  const coverImageId = await createOrGetAsset(
    environment,
    event.coverImage,
    `${event.title} - Cover`
  );

  console.log(`   📷 Creating display image asset...`);
  const displayImageId = await createOrGetAsset(
    environment,
    event.eventDisplayImage,
    `${event.title} - Display`
  );

  // Create gallery image assets
  const galleryImageIds: string[] = [];
  if (event.images && event.images.length > 0) {
    console.log(`   📷 Creating ${event.images.length} gallery images...`);
    for (let i = 0; i < event.images.length; i++) {
      const imageId = await createOrGetAsset(
        environment,
        event.images[i],
        `${event.title} - Gallery ${i + 1}`
      );
      galleryImageIds.push(imageId);
    }
  }

  // Format dates as ISO strings
  const dates = Array.isArray(event.date)
    ? event.date.map((d) => d.toISOString().split("T")[0])
    : event.date
    ? [event.date.toISOString().split("T")[0]]
    : [];

  // Create the event entry
  const fields: Record<string, unknown> = {
    title: localized(event.title),
    slug: localized(event.slug),
    description: localized(event.description),
    dates: localized(dates),
    coverImage: localized(createLink(coverImageId, "Asset")),
    eventDisplayImage: localized(createLink(displayImageId, "Asset")),
    term: localized(createLink(termId, "Entry")),
  };

  // Add optional fields
  if (event.tags && event.tags.length > 0) {
    fields.tags = localized(event.tags);
  }
  if (event.location) {
    fields.location = localized(event.location);
  }
  if (event.startingTime) {
    fields.startingTime = localized(event.startingTime);
  }
  if (event.endingTime) {
    fields.endingTime = localized(event.endingTime);
  }
  if (event.registrationLink) {
    fields.registrationLink = localized(event.registrationLink);
  }
  if (event.socialLinks?.facebook) {
    fields.facebookLink = localized(event.socialLinks.facebook);
  }
  if (event.socialLinks?.instagram) {
    fields.instagramLink = localized(event.socialLinks.instagram);
  }
  if (event.socialLinks?.website) {
    fields.websiteLink = localized(event.socialLinks.website);
  }
  if (event.hashtags && event.hashtags.length > 0) {
    fields.hashtags = localized(event.hashtags);
  }
  if (galleryImageIds.length > 0) {
    fields.galleryImages = localized(
      galleryImageIds.map((id) => createLink(id, "Asset"))
    );
  }

  const entry = await environment.createEntryWithId("event", eventId, { fields });
  await entry.publish();
  console.log(`   ✅ Created event: ${event.title}`);
}

async function createOfficer(
  environment: Environment,
  officer: Officer,
  order: number,
  roleType: "chief" | "deputy" | "committee" | "member"
): Promise<string> {
  const officerId = generateId("officer", officer.name);
  
  // Check cache
  if (entryCache.has(officerId)) {
    return entryCache.get(officerId)!;
  }

  // Check if officer already exists
  try {
    const existing = await environment.getEntry(officerId);
    entryCache.set(officerId, existing.sys.id);
    return existing.sys.id;
  } catch {
    // Officer doesn't exist, create it
  }

  console.log(`      👤 Creating officer: ${officer.name}`);

  // Create profile image asset
  const imageId = await createOrGetAsset(
    environment,
    officer.imageSrc.startsWith("/")
      ? `https://start-dost.com${officer.imageSrc}`
      : officer.imageSrc,
    `${officer.name} - Profile`
  );

  // Build fields
  const fields: Record<string, unknown> = {
    name: localized(officer.name),
    position: localized(officer.position),
    image: localized(createLink(imageId, "Asset")),
    roleType: localized(roleType),
    order: localized(order),
  };

  // Add social links
  if (officer.socialLinks.facebook) {
    fields.facebookLink = localized(officer.socialLinks.facebook);
  }
  if (officer.socialLinks.github) {
    fields.githubLink = localized(officer.socialLinks.github);
  }
  if (officer.socialLinks.linkedin) {
    fields.linkedinLink = localized(officer.socialLinks.linkedin);
  }
  if (officer.socialLinks.instagram) {
    fields.instagramLink = localized(officer.socialLinks.instagram);
  }
  if (officer.socialLinks.website) {
    fields.websiteLink = localized(officer.socialLinks.website);
  }
  if (officer.socialLinks.behance) {
    fields.behanceLink = localized(officer.socialLinks.behance);
  }
  if (officer.socialLinks.youtube) {
    fields.youtubeLink = localized(officer.socialLinks.youtube);
  }
  if (officer.socialLinks.twitter) {
    fields.twitterLink = localized(officer.socialLinks.twitter);
  }

  const entry = await environment.createEntryWithId("officer", officerId, { fields });
  await entry.publish();
  
  entryCache.set(officerId, entry.sys.id);
  return entry.sys.id;
}

async function createDepartment(
  environment: Environment,
  department: Department,
  termId: string,
  order: number
): Promise<string> {
  const deptId = generateId("dept", `${department.tabName}-${termId}`);
  
  // Check if department already exists
  try {
    const existing = await environment.getEntry(deptId);
    return existing.sys.id;
  } catch {
    // Department doesn't exist, create it
  }

  console.log(`\n   🏢 Creating department: ${department.name}`);

  const entry = await environment.createEntryWithId("department", deptId, {
    fields: {
      name: localized(department.name),
      tabName: localized(department.tabName),
      description: localized(department.description),
      order: localized(order),
      term: localized(createLink(termId, "Entry")),
    },
  });

  await entry.publish();
  return entry.sys.id;
}

async function createDepartmentOfficer(
  environment: Environment,
  departmentId: string,
  officerId: string,
  order: number,
  section: "special" | "regular" | "subDepartment",
  subDeptName?: string,
  subDeptDesc?: string
): Promise<void> {
  const linkId = generateId("link", `${departmentId}-${officerId}`);
  
  // Check if link already exists
  try {
    await environment.getEntry(linkId);
    return; // Already exists
  } catch {
    // Link doesn't exist, create it
  }

  const fields: Record<string, unknown> = {
    department: localized(createLink(departmentId, "Entry")),
    officer: localized(createLink(officerId, "Entry")),
    order: localized(order),
    section: localized(section),
  };

  if (subDeptName) {
    fields.subDepartmentName = localized(subDeptName);
  }
  if (subDeptDesc) {
    fields.subDepartmentDescription = localized(subDeptDesc);
  }

  const entry = await environment.createEntryWithId("departmentOfficer", linkId, { fields });
  await entry.publish();
}

async function migrateDepartment(
  environment: Environment,
  department: Department,
  termId: string,
  deptOrder: number
): Promise<void> {
  // Create the department
  const departmentId = await createDepartment(environment, department, termId, deptOrder);

  // Create special officers (chiefs, deputies)
  let officerOrder = 0;
  for (const officer of department.specialOfficers) {
    // Determine role type based on position
    const roleType = officer.position.toLowerCase().includes("deputy")
      ? "deputy"
      : "chief";
    
    const officerId = await createOfficer(
      environment,
      officer,
      officerOrder,
      roleType
    );
    
    await createDepartmentOfficer(
      environment,
      departmentId,
      officerId,
      officerOrder,
      "special"
    );
    officerOrder++;
  }

  // Create regular officers
  for (const officer of department.officers) {
    // Determine role type
    let roleType: "chief" | "deputy" | "committee" | "member" = "member";
    const posLower = officer.position.toLowerCase();
    if (posLower.includes("chief")) {
      roleType = "chief";
    } else if (posLower.includes("deputy")) {
      roleType = "deputy";
    } else if (posLower.includes("lead") || posLower.includes("head")) {
      roleType = "committee";
    }
    
    const officerId = await createOfficer(
      environment,
      officer,
      officerOrder,
      roleType
    );
    
    await createDepartmentOfficer(
      environment,
      departmentId,
      officerId,
      officerOrder,
      "regular"
    );
    officerOrder++;
  }

  // Create sub-department officers
  if (department.subDepartment) {
    for (const subDept of department.subDepartment) {
      for (const officer of subDept.officers) {
        const officerId = await createOfficer(
          environment,
          officer,
          officerOrder,
          "member"
        );
        
        await createDepartmentOfficer(
          environment,
          departmentId,
          officerId,
          officerOrder,
          "subDepartment",
          subDept.name,
          subDept.description
        );
        officerOrder++;
      }
    }
  }
}

async function main(): Promise<void> {
  console.log("🚀 Starting Contentful Data Migration");
  console.log("======================================");
  console.log(`Space ID: ${SPACE_ID}`);
  console.log(`Environment: ${ENVIRONMENT_ID}`);

  const client = createClient({
    accessToken: MANAGEMENT_TOKEN!,
  });

  try {
    const environment = await getEnvironment(client);
    console.log(`\n✅ Connected to Contentful environment: ${ENVIRONMENT_ID}`);

    // Step 1: Create terms
    console.log("\n📅 Step 1: Creating Terms");
    console.log("-------------------------");
    
    // Create term for current events (2024-2025)
    const currentTermId = await createTerm(environment, "2024-2025");

    // Step 2: Migrate events
    console.log("\n📅 Step 2: Migrating Events");
    console.log("----------------------------");
    console.log(`Found ${allEvents.length} events to migrate`);

    for (const event of allEvents) {
      try {
        await migrateEvent(environment, event, currentTermId);
      } catch (error) {
        console.error(`   ❌ Failed to migrate event "${event.title}":`, error);
      }
    }

    // Step 3: Migrate officers by batch year
    console.log("\n👥 Step 3: Migrating Officers");
    console.log("------------------------------");

    for (const batchYear of officerBatchYears.batchYears) {
      console.log(`\n📆 Processing batch year: ${batchYear.year}`);
      
      const termId = await createTerm(environment, batchYear.year);

      let deptOrder = 0;
      for (const department of batchYear.departments) {
        try {
          await migrateDepartment(environment, department, termId, deptOrder);
          deptOrder++;
        } catch (error) {
          console.error(`   ❌ Failed to migrate department "${department.name}":`, error);
        }
      }
    }

    console.log("\n======================================");
    console.log("✅ Data migration completed successfully!");
    console.log("\nSummary:");
    console.log(`   - Events migrated: ${allEvents.length}`);
    console.log(`   - Batch years processed: ${officerBatchYears.batchYears.length}`);
    console.log("\nNext steps:");
    console.log("1. Verify the content in Contentful web app");
    console.log("2. Update the website to fetch data from Contentful");
    console.log("3. Set up the Contentful Delivery API in your app");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

main();

