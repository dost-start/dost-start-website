/**
 * Contentful Officer CSV Import Script
 * 
 * Imports officers from a CSV file into Contentful CMS.
 * Handles Google Drive image downloads and asset uploads.
 * 
 * Usage:
 *   npx tsx scripts/contentful/import-officers-csv.ts
 * 
 * Required environment variables:
 *   CONTENTFUL_SPACE_ID - Your Contentful space ID
 *   CONTENTFUL_MANAGEMENT_TOKEN - Management API token (with write access)
 *   CONTENTFUL_ENVIRONMENT - Environment name (default: "master")
 * 
 * CSV Expected Columns:
 *   - Full Name
 *   - Department
 *   - Position (Chief, Deputy Chief, Committee)
 *   - Designation/Official Title
 *   - Upload a Square Headshot Photo (Google Drive link)
 *   - LinkedIn
 *   - Portfolio Website
 *   - Github
 */

import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";
import { createClient, ClientAPI, Environment } from "contentful-management";
import * as https from "https";
import * as http from "http";
import * as dotenv from "dotenv";

dotenv.config();

// Configuration
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT || "master";
const DEFAULT_LOCALE = "en-US";

// CSV file path (relative to script location)
const CSV_FILE_PATH = path.join(
  __dirname,
  "START Officers and Committees Data Submission for Website Content (Responses) - Sheet1.csv"
);

// Temp directory for downloaded images
const TEMP_DIR = path.join(__dirname, "temp-images");

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error("❌ Missing required environment variables:");
  console.error("   CONTENTFUL_SPACE_ID and CONTENTFUL_MANAGEMENT_TOKEN are required.");
  process.exit(1);
}

// ============================================
// Type Definitions
// ============================================

interface CSVOfficer {
  fullName: string;
  department: string;
  position: string;        // Chief, Deputy Chief, Committee
  designation: string;     // Official title
  photoUrl: string;        // Google Drive link
  linkedin: string;
  portfolio: string;
  github: string;
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
 * Map Position field to roleType enum
 */
function mapPositionToRoleType(position: string): "chief" | "deputy" | "committee" | "member" {
  const posLower = position.toLowerCase().trim();
  
  if (posLower === "chief") {
    return "chief";
  } else if (posLower === "deputy chief" || posLower.includes("deputy")) {
    return "deputy";
  } else if (posLower === "committee" || posLower.includes("committee")) {
    return "committee";
  }
  
  return "member";
}

/**
 * Extract Google Drive file ID from various URL formats
 */
function extractGoogleDriveFileId(url: string): string | null {
  if (!url) return null;
  
  // Format: https://drive.google.com/open?id=FILE_ID
  let match = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  
  // Format: https://drive.google.com/file/d/FILE_ID/view
  match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  
  // Format: https://drive.google.com/uc?id=FILE_ID
  match = url.match(/\/uc\?.*id=([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  
  return null;
}

/**
 * Download file from URL with redirect support
 */
function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const protocol = url.startsWith("https") ? https : http;
    
    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 303) {
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          file.close();
          fs.unlinkSync(destPath);
          downloadFile(redirectUrl, destPath).then(resolve).catch(reject);
          return;
        }
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on("finish", () => {
        file.close();
        resolve();
      });
    });
    
    request.on("error", (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
    
    file.on("error", (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

/**
 * Download image from Google Drive
 */
async function downloadGoogleDriveImage(
  fileId: string,
  officerName: string
): Promise<string | null> {
  // Ensure temp directory exists
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }
  
  const fileName = `${generateId("officer", officerName)}.jpg`;
  const filePath = path.join(TEMP_DIR, fileName);
  
  // Google Drive direct download URL
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  
  try {
    console.log(`      📥 Downloading image for ${officerName}...`);
    await downloadFile(downloadUrl, filePath);
    
    // Verify file was downloaded
    const stats = fs.statSync(filePath);
    if (stats.size < 1000) {
      // File too small, might be an error page
      console.log(`      ⚠️  Downloaded file too small, might need manual download`);
      return null;
    }
    
    return filePath;
  } catch (error) {
    console.error(`      ❌ Failed to download image: ${error}`);
    return null;
  }
}

/**
 * Upload image to Contentful as an asset
 */
async function uploadAsset(
  environment: Environment,
  filePath: string,
  title: string
): Promise<string | null> {
  try {
    console.log(`      📤 Uploading asset: ${title}...`);
    
    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);
    
    // Create upload
    const upload = await environment.createUpload({
      file: fileBuffer,
    });
    
    // Create asset with the upload
    const asset = await environment.createAsset({
      fields: {
        title: localized(title),
        file: localized({
          contentType: "image/jpeg",
          fileName: fileName,
          uploadFrom: {
            sys: {
              type: "Link",
              linkType: "Upload",
              id: upload.sys.id,
            },
          },
        }),
      },
    });
    
    // Process the asset
    const processedAsset = await asset.processForAllLocales();
    
    // Wait for processing
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // Fetch fresh and publish
    const refreshedAsset = await environment.getAsset(processedAsset.sys.id);
    await refreshedAsset.publish();
    
    console.log(`      ✅ Asset uploaded: ${refreshedAsset.sys.id}`);
    return refreshedAsset.sys.id;
  } catch (error) {
    console.error(`      ❌ Failed to upload asset: ${error}`);
    return null;
  }
}

/**
 * Create officer (allows duplicates)
 */
async function createOfficer(
  environment: Environment,
  officer: CSVOfficer,
  order: number,
  imageAssetId: string | null
): Promise<string | null> {
  // Generate unique ID with timestamp to allow duplicates
  const timestamp = Date.now();
  const officerId = generateId("officer", `${officer.fullName}-${timestamp}`);
  
  console.log(`   👤 Creating officer: ${officer.fullName}`);
  
  // Build fields
  const fields: Record<string, unknown> = {
    name: localized(officer.fullName),
    position: localized(officer.designation),
    roleType: localized(mapPositionToRoleType(officer.position)),
    order: localized(order),
  };
  
  // Add image if available
  if (imageAssetId) {
    fields.image = localized(createLink(imageAssetId, "Asset"));
  }
  
  // Add social links (clean up URLs)
  if (officer.linkedin) {
    let linkedinUrl = officer.linkedin.trim();
    if (!linkedinUrl.startsWith("http")) {
      linkedinUrl = `https://${linkedinUrl}`;
    }
    fields.linkedinLink = localized(linkedinUrl);
  }
  
  if (officer.portfolio) {
    let portfolioUrl = officer.portfolio.trim();
    if (!portfolioUrl.startsWith("http")) {
      portfolioUrl = `https://${portfolioUrl}`;
    }
    fields.websiteLink = localized(portfolioUrl);
  }
  
  if (officer.github) {
    let githubUrl = officer.github.trim();
    if (!githubUrl.startsWith("http")) {
      githubUrl = `https://${githubUrl}`;
    }
    fields.githubLink = localized(githubUrl);
  }
  
  try {
    const entry = await environment.createEntryWithId("officer", officerId, { fields });
    
    // Only publish if we have an image (required field)
    if (imageAssetId) {
      await entry.publish();
      console.log(`   ✅ Created and published officer: ${officer.fullName}`);
    } else {
      console.log(`   ⚠️  Created officer as draft (missing image): ${officer.fullName}`);
    }
    
    return entry.sys.id;
  } catch (error) {
    console.error(`   ❌ Failed to create officer ${officer.fullName}:`, error);
    return null;
  }
}

/**
 * Parse CSV file
 */
function parseCSV(filePath: string): CSVOfficer[] {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  
  return records.map((record: Record<string, string>) => ({
    fullName: record["Full Name"] || "",
    department: record["Department"] || "",
    position: record["Position"] || "",
    designation: record["Designation/Official Title"] || "",
    photoUrl: record["Upload a Square Headshot Photo (JPEG/PNG, Max 10MB)"] || "",
    linkedin: record["LinkedIn"] || "",
    portfolio: record["Portfolio Website"] || "",
    github: record["Github"] || "",
  }));
}

/**
 * Get Contentful environment
 */
async function getEnvironment(client: ClientAPI): Promise<Environment> {
  const space = await client.getSpace(SPACE_ID!);
  return space.getEnvironment(ENVIRONMENT_ID);
}

/**
 * Clean up temporary files
 */
function cleanupTempFiles(): void {
  if (fs.existsSync(TEMP_DIR)) {
    const files = fs.readdirSync(TEMP_DIR);
    for (const file of files) {
      fs.unlinkSync(path.join(TEMP_DIR, file));
    }
    fs.rmdirSync(TEMP_DIR);
    console.log("\n🧹 Cleaned up temporary files");
  }
}

// ============================================
// Main Script
// ============================================

async function main(): Promise<void> {
  console.log("🚀 Contentful Officer CSV Import");
  console.log("=================================");
  console.log(`Space ID: ${SPACE_ID}`);
  console.log(`Environment: ${ENVIRONMENT_ID}`);
  console.log(`CSV File: ${CSV_FILE_PATH}`);
  
  // Check if CSV file exists
  if (!fs.existsSync(CSV_FILE_PATH)) {
    console.error(`\n❌ CSV file not found: ${CSV_FILE_PATH}`);
    process.exit(1);
  }
  
  // Parse CSV
  console.log("\n📄 Parsing CSV file...");
  const officers = parseCSV(CSV_FILE_PATH);
  console.log(`   Found ${officers.length} officers in CSV`);
  
  if (officers.length === 0) {
    console.log("\n⚠️  No officers found in CSV. Exiting.");
    return;
  }
  
  // Show preview
  console.log("\n📋 Officer Preview:");
  officers.forEach((o, i) => {
    console.log(`   ${i + 1}. ${o.fullName} - ${o.designation} (${o.department})`);
  });
  
  // Connect to Contentful
  console.log("\n🔗 Connecting to Contentful...");
  const client = createClient({
    accessToken: MANAGEMENT_TOKEN!,
  });
  
  try {
    const environment = await getEnvironment(client);
    console.log(`✅ Connected to Contentful environment: ${ENVIRONMENT_ID}`);
    
    // Process each officer
    console.log("\n👥 Processing Officers");
    console.log("-----------------------");
    
    const results = {
      created: 0,
      failed: 0,
    };
    
    // Group officers by department
    const byDepartment = new Map<string, CSVOfficer[]>();
    for (const officer of officers) {
      const dept = officer.department || "Unknown";
      if (!byDepartment.has(dept)) {
        byDepartment.set(dept, []);
      }
      byDepartment.get(dept)!.push(officer);
    }
    
    let globalOrder = 0;
    
    for (const [department, deptOfficers] of byDepartment) {
      console.log(`\n📁 Department: ${department}`);
      
      for (const officer of deptOfficers) {
        try {
          // Download image from Google Drive
          let imageAssetId: string | null = null;
          const fileId = extractGoogleDriveFileId(officer.photoUrl);
          
          if (fileId) {
            const localPath = await downloadGoogleDriveImage(fileId, officer.fullName);
            
            if (localPath) {
              imageAssetId = await uploadAsset(
                environment,
                localPath,
                `${officer.fullName} - Profile`
              );
            }
          } else if (officer.photoUrl) {
            console.log(`      ⚠️  Could not parse Google Drive URL: ${officer.photoUrl}`);
          }
          
          // Create officer
          const officerId = await createOfficer(
            environment,
            officer,
            globalOrder,
            imageAssetId
          );
          
          if (officerId) {
            results.created++;
          } else {
            results.failed++;
          }
          
          globalOrder++;
          
          // Small delay to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (error) {
          console.error(`   ❌ Error processing ${officer.fullName}:`, error);
          results.failed++;
        }
      }
    }
    
    // Cleanup
    cleanupTempFiles();
    
    // Summary
    console.log("\n=================================");
    console.log("✅ Import completed!");
    console.log("\nSummary:");
    console.log(`   - Created/Replaced: ${results.created}`);
    console.log(`   - Failed: ${results.failed}`);
    console.log("\nNext steps:");
    console.log("1. Review the imported officers in Contentful");
    console.log("2. Add missing images manually for any failed uploads");
    console.log("3. Link officers to departments if needed");
    
  } catch (error) {
    console.error("\n❌ Import failed:", error);
    cleanupTempFiles();
    process.exit(1);
  }
}

main();
