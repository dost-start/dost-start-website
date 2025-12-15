/**
 * Contentful Content Model Migration Script
 * 
 * This script creates or updates content models in Contentful.
 * 
 * Usage:
 *   npx tsx scripts/contentful/migrate-models.ts
 * 
 * Required environment variables:
 *   CONTENTFUL_SPACE_ID - Your Contentful space ID
 *   CONTENTFUL_MANAGEMENT_TOKEN - Management API token (with write access)
 *   CONTENTFUL_ENVIRONMENT - Environment name (default: "master")
 */

import { createClient, ClientAPI, Environment, ContentType } from "contentful-management";
import { contentModels, ContentModel } from "./content-models";

// Configuration
import * as dotenv from "dotenv";
dotenv.config();

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error("❌ Missing required environment variables:");
  console.error("   CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN are required.");
  console.error("");
  console.error("Set them before running this script:");
  console.error("   Windows (PowerShell):");
  console.error('   $env:CONTENTFUL_SPACE_ID="your-space-id"');
  console.error('   $env:CONTENTFUL_MANAGEMENT_TOKEN="your-management-token"');
  console.error("");
  console.error("   Unix/macOS:");
  console.error('   export CONTENTFUL_SPACE_ID="your-space-id"');
  console.error('   export CONTENTFUL_MANAGEMENT_TOKEN="your-management-token"');
  process.exit(1);
}

async function getEnvironment(client: ClientAPI): Promise<Environment> {
  const space = await client.getSpace(SPACE_ID!);
  return space.getEnvironment(ENVIRONMENT_ID);
}

async function contentTypeExists(
  environment: Environment,
  contentTypeId: string
): Promise<ContentType | null> {
  try {
    return await environment.getContentType(contentTypeId);
  } catch {
    return null;
  }
}

async function createOrUpdateContentType(
  environment: Environment,
  model: ContentModel
): Promise<void> {
  console.log(`\n📋 Processing content type: ${model.name} (${model.id})`);

  const existingType = await contentTypeExists(environment, model.id);

  // Prepare fields in Contentful format
  const fields = model.fields.map((field) => {
    const baseField: Record<string, unknown> = {
      id: field.id,
      name: field.name,
      type: field.type,
      required: field.required,
      localized: field.localized || false,
    };

    if (field.validations) {
      baseField.validations = field.validations;
    }

    if (field.linkType) {
      baseField.linkType = field.linkType;
    }

    if (field.items) {
      baseField.items = field.items;
    }

    return baseField;
  });

  if (existingType) {
    console.log(`   ⚠️  Content type "${model.id}" already exists. Updating...`);
    
    existingType.name = model.name;
    existingType.description = model.description;
    existingType.displayField = model.displayField;
    existingType.fields = fields as ContentType["fields"];

    const updatedType = await existingType.update();
    await updatedType.publish();
    console.log(`   ✅ Updated and published: ${model.name}`);
  } else {
    console.log(`   🆕 Creating new content type: ${model.id}`);
    
    const contentType = await environment.createContentTypeWithId(model.id, {
      name: model.name,
      description: model.description,
      displayField: model.displayField,
      fields: fields as ContentType["fields"],
    });

    await contentType.publish();
    console.log(`   ✅ Created and published: ${model.name}`);
  }
}

async function main(): Promise<void> {
  console.log("🚀 Starting Contentful Content Model Migration");
  console.log("================================================");
  console.log(`Space ID: ${SPACE_ID}`);
  console.log(`Environment: ${ENVIRONMENT_ID}`);

  const client = createClient({
    accessToken: MANAGEMENT_TOKEN!,
  });

  try {
    const environment = await getEnvironment(client);
    console.log(`\n✅ Connected to Contentful environment: ${ENVIRONMENT_ID}`);

    // Create content types in order (terms first, then others that reference them)
    for (const model of contentModels) {
      await createOrUpdateContentType(environment, model);
    }

    console.log("\n================================================");
    console.log("✅ Content model migration completed successfully!");
    console.log("\nNext steps:");
    console.log("1. Go to Contentful web app to verify the content models");
    console.log("2. Run the data migration script to import existing content:");
    console.log("   npx tsx scripts/contentful/migrate-data.ts");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

main();

