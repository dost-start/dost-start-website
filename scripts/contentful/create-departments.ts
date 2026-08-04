/**
 * Contentful Department Seeding Script
 *
 * Copies every Department of one term into another term. Each new entry keeps
 * the source entry's fields verbatim (name, tabName, description, order, ...);
 * only the entry ID, the `term` link, and the term marker on `entryTitle`
 * ("CRRD - 2526" -> "CRRD - 2627") change. Existing departments in the target
 * term are left untouched.
 *
 * Run this once per term, before importing that term's officers with
 * import-officers-csv.ts.
 *
 * Usage:
 *   npx tsx scripts/contentful/create-departments.ts
 *   npx tsx scripts/contentful/create-departments.ts --dry-run
 *   npx tsx scripts/contentful/create-departments.ts --from 2025-2026 --to 2026-2027
 *
 * Required environment variables:
 *   CONTENTFUL_SPACE_ID - Your Contentful space ID
 *   CONTENTFUL_MANAGEMENT_TOKEN - Management API token (with write access)
 *   CONTENTFUL_ENVIRONMENT - Environment name (default: "master")
 */

import { createClient, ClientAPI, Environment } from "contentful-management";
import * as dotenv from "dotenv";

dotenv.config();

// Configuration
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";
const DEFAULT_LOCALE = "en-US";

// Term to copy departments from, and the term to create them in.
// Override on the command line with --from / --to.
const SOURCE_TERM_NAME = "2025-2026";
const TARGET_TERM_NAME = "2026-2027";

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error("❌ Missing required environment variables:");
  console.error("   CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN are required.");
  process.exit(1);
}

// ============================================
// Helper Functions
// ============================================

function localized<T>(value: T): { [key: string]: T } {
  return { [DEFAULT_LOCALE]: value };
}

function createLink(id: string, linkType: "Entry" | "Asset" = "Entry") {
  return {
    sys: {
      type: "Link" as const,
      linkType,
      id,
    },
  };
}

function generateId(prefix: string, name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 40);
  return `${prefix}-${slug}`;
}

/**
 * Short term marker used in generated entry IDs: "2026-2027" -> "2627"
 */
function getTermSuffix(termName: string): string {
  const years = termName.match(/\d{4}/g);
  if (years && years.length >= 2) {
    return `${years[0].slice(-2)}${years[1].slice(-2)}`;
  }
  return termName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

/**
 * Re-stamp the term marker on a cloned entry title, keeping whatever label the
 * source used: "CRRD - 2526" + "2627" -> "CRRD - 2627".
 * A title with no marker just gets one appended.
 */
function retitleForTerm(sourceTitle: string, termSuffix: string): string {
  const label = sourceTitle.replace(/\s*-\s*\d{4}\s*$/, "").trim();
  return `${label} - ${termSuffix}`;
}

/**
 * Read --from / --to / --dry-run off the command line
 */
function parseArgs(): { from: string; to: string; dryRun: boolean } {
  const argv = process.argv.slice(2);
  const valueOf = (flag: string): string | undefined => {
    const index = argv.indexOf(flag);
    return index >= 0 ? argv[index + 1] : undefined;
  };

  return {
    from: valueOf("--from") || SOURCE_TERM_NAME,
    to: valueOf("--to") || TARGET_TERM_NAME,
    dryRun: argv.includes("--dry-run"),
  };
}

async function getEnvironment(client: ClientAPI): Promise<Environment> {
  const space = await client.getSpace(SPACE_ID!);
  return space.getEnvironment(ENVIRONMENT_ID);
}

// ============================================
// Contentful Operations
// ============================================

/**
 * Find a Term entry by name
 */
async function getTermByName(
  environment: Environment,
  termName: string
): Promise<string | null> {
  const terms = await environment.getEntries({
    content_type: "term",
    "fields.name": termName,
    limit: 1,
  });

  return terms.items.length > 0 ? terms.items[0].sys.id : null;
}

/**
 * Get the target Term, creating it if it doesn't exist yet
 */
async function getOrCreateTerm(
  environment: Environment,
  termName: string,
  dryRun: boolean
): Promise<string | null> {
  const existingId = await getTermByName(environment, termName);

  if (existingId) {
    console.log(`📅 Found term: ${termName} (ID: ${existingId})`);
    return existingId;
  }

  const startYear = Number(termName.slice(0, 4));

  if (Number.isNaN(startYear)) {
    console.error(`❌ Cannot derive dates for term "${termName}" - expected a "YYYY-YYYY" name`);
    return null;
  }

  if (dryRun) {
    console.log(`📅 [dry run] Would create term: ${termName}`);
    return "dry-run-term-id";
  }

  console.log(`📅 Creating term: ${termName}`);

  try {
    const entry = await environment.createEntry("term", {
      fields: {
        name: localized(termName),
        startDate: localized(`${startYear}-07-01T00:00:00.000Z`),
        endDate: localized(`${startYear + 1}-06-30T23:59:59.000Z`),
        isActive: localized(true),
      },
    });

    await entry.publish();
    console.log(`✅ Created term: ${termName} (ID: ${entry.sys.id})`);
    return entry.sys.id;
  } catch (error) {
    console.error(`❌ Failed to create term:`, error);
    return null;
  }
}

/**
 * All Department entries belonging to a term
 */
async function getDepartmentsForTerm(environment: Environment, termId: string) {
  const departments = await environment.getEntries({
    content_type: "department",
    "fields.term.sys.id": termId,
    limit: 200,
  });

  return departments.items;
}

// ============================================
// Main Script
// ============================================

async function main(): Promise<void> {
  const { from, to, dryRun } = parseArgs();

  console.log("🚀 Contentful Department Seeding");
  console.log("=================================");
  console.log(`Space ID: ${SPACE_ID}`);
  console.log(`Environment: ${ENVIRONMENT_ID}`);
  console.log(`Copy departments: ${from} → ${to}`);
  if (dryRun) {
    console.log("Mode: DRY RUN (no writes)");
  }

  console.log("\n🔗 Connecting to Contentful...");
  const client = createClient({ accessToken: MANAGEMENT_TOKEN! });

  try {
    const environment = await getEnvironment(client);
    console.log(`✅ Connected to Contentful environment: ${ENVIRONMENT_ID}`);

    // Resolve both terms
    console.log("\n📅 Resolving Terms");
    console.log("-------------------");

    const sourceTermId = await getTermByName(environment, from);

    if (!sourceTermId) {
      console.error(`❌ Source term "${from}" not found. Aborting.`);
      process.exit(1);
    }

    console.log(`📅 Found source term: ${from} (ID: ${sourceTermId})`);

    const targetTermId = await getOrCreateTerm(environment, to, dryRun);

    if (!targetTermId) {
      console.error("❌ Failed to get/create target term. Aborting.");
      process.exit(1);
    }

    if (sourceTermId === targetTermId) {
      console.error("❌ Source and target term are the same. Aborting.");
      process.exit(1);
    }

    // Load both sides
    const sourceDepartments = await getDepartmentsForTerm(environment, sourceTermId);
    console.log(`\n📂 ${from} has ${sourceDepartments.length} department(s)`);

    if (sourceDepartments.length === 0) {
      console.log("⚠️  Nothing to copy. Exiting.");
      return;
    }

    const targetDepartments = dryRun && targetTermId === "dry-run-term-id"
      ? []
      : await getDepartmentsForTerm(environment, targetTermId);

    const existingNames = new Set(
      targetDepartments.map((dept) => dept.fields.name?.[DEFAULT_LOCALE])
    );

    // Copy each department over
    console.log("\n🏗️  Creating Departments");
    console.log("-------------------------");

    const termSuffix = getTermSuffix(to);
    const results = { created: 0, skipped: 0, failed: 0 };

    // Source order defines the tab order on the site - keep it
    sourceDepartments.sort(
      (a, b) =>
        (a.fields.order?.[DEFAULT_LOCALE] ?? 0) - (b.fields.order?.[DEFAULT_LOCALE] ?? 0)
    );

    for (const sourceDept of sourceDepartments) {
      const name = sourceDept.fields.name?.[DEFAULT_LOCALE] as string;

      if (existingNames.has(name)) {
        console.log(`   ⏭️  Skipping "${name}" - already exists in ${to}`);
        results.skipped++;
        continue;
      }

      // Copy every field verbatim, then point it at the target term
      const fields: typeof sourceDept.fields = {
        ...sourceDept.fields,
        term: localized(createLink(targetTermId, "Entry")),
      };

      // entryTitle is the CMS-facing entry name and carries its own term marker
      // ("CRRD - 2526"), so it has to be re-stamped rather than copied as-is
      const sourceTitle = sourceDept.fields.entryTitle?.[DEFAULT_LOCALE];
      const entryTitle = sourceTitle ? retitleForTerm(sourceTitle, termSuffix) : undefined;

      if (entryTitle) {
        fields.entryTitle = localized(entryTitle);
      }

      const departmentId = `${generateId("dept", name)}-${termSuffix}`;

      if (dryRun) {
        console.log(`   🔍 [dry run] Would create "${entryTitle ?? name}" (ID: ${departmentId})`);
        console.log(`        name: ${name}, tabName: ${sourceDept.fields.tabName?.[DEFAULT_LOCALE]}, order: ${sourceDept.fields.order?.[DEFAULT_LOCALE]}`);
        results.created++;
        continue;
      }

      try {
        const entry = await environment.createEntryWithId("department", departmentId, {
          fields,
        });
        await entry.publish();

        console.log(`   ✅ Created "${entryTitle ?? name}" (ID: ${departmentId})`);
        results.created++;
      } catch (error) {
        console.error(`   ❌ Failed to create "${name}" (ID: ${departmentId}):`, error);
        results.failed++;
      }
    }

    // Summary
    console.log("\n=================================");
    console.log(dryRun ? "✅ Dry run completed!" : "✅ Department seeding completed!");
    console.log("\nSummary:");
    console.log(`   Created: ${results.created}`);
    console.log(`   Skipped (already existed): ${results.skipped}`);
    console.log(`   Failed: ${results.failed}`);

    if (!dryRun && results.created > 0) {
      console.log("\nNext steps:");
      console.log(`1. Review the ${to} departments in Contentful`);
      console.log("2. Import that term's officers: npm run contentful:import-officers");
    }
  } catch (error) {
    console.error("\n❌ Department seeding failed:", error);
    process.exit(1);
  }
}

main();
