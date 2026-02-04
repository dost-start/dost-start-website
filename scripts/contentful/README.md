# Contentful Migration Scripts

This directory contains scripts for migrating content models and data to Contentful CMS.

## Prerequisites

1. **Create a Contentful Account**: Sign up at [contentful.com](https://www.contentful.com/)

2. **Create a Space**: Create a new space for your website content

3. **Get API Tokens**: Go to Settings → API keys and create:
   - **Content Delivery API token** (for reading published content)
   - **Content Preview API token** (for reading draft content)
   - **Content Management API token** (for migration scripts - personal access token from Settings → CMA tokens)

## Environment Setup

Set these environment variables before running the scripts:

### Windows (PowerShell)
```powershell
$env:CONTENTFUL_SPACE_ID="your_space_id"
$env:CONTENTFUL_MANAGEMENT_TOKEN="your_management_token"
$env:CONTENTFUL_ACCESS_TOKEN="your_delivery_token"
$env:CONTENTFUL_ENVIRONMENT="master"
```

### Unix/macOS (Bash)
```bash
export CONTENTFUL_SPACE_ID="your_space_id"
export CONTENTFUL_MANAGEMENT_TOKEN="your_management_token"
export CONTENTFUL_ACCESS_TOKEN="your_delivery_token"
export CONTENTFUL_ENVIRONMENT="master"
```

### Using a .env.local file
Create a `.env.local` file in the project root:
```
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
CONTENTFUL_ACCESS_TOKEN=your_delivery_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token
CONTENTFUL_ENVIRONMENT=master
```

## Running the Migration

### Step 1: Create Content Models
This creates the content type definitions in Contentful:

```bash
npm run contentful:migrate-models
```

Or directly:
```bash
npx tsx scripts/contentful/migrate-models.ts
```

### Step 2: Migrate Data
This migrates existing events and officers data to Contentful:

```bash
npm run contentful:migrate-data
```

Or directly:
```bash
npx tsx scripts/contentful/migrate-data.ts
```

### Step 3: Run Both
Run both migrations in sequence:

```bash
npm run contentful:migrate
```

### Step 4: Import Officers from CSV (Optional)
If you have a CSV file with officer data, you can import it:

```bash
npm run contentful:import-officers
```

Or directly:
```bash
npx tsx scripts/contentful/import-officers-csv.ts
```

**CSV Format Expected:**

| Column | Description |
|--------|-------------|
| Full Name | Officer's full name |
| Department | Department name (e.g., Communication, Finance) |
| Position | Role classification (Chief, Deputy Chief, Committee) |
| Designation/Official Title | Full title (e.g., Chief Communications Officer) |
| Upload a Square Headshot Photo (JPEG/PNG, Max 10MB) | Google Drive link to photo |
| LinkedIn | LinkedIn profile URL |
| Portfolio Website | Personal website URL |
| Github | GitHub profile URL |

The script will:
1. Parse the CSV file
2. Download images from Google Drive links
3. Upload images as Contentful assets
4. Create officer entries with all data
5. Map Position to roleType (Chief→chief, Deputy Chief→deputy, Committee→committee)

## Content Models Created

### Term
- `name`: Academic year (e.g., "2024-2025")
- `startDate`: Term start date
- `endDate`: Term end date
- `isActive`: Whether this is the current term

### Event
- `title`: Event title
- `slug`: URL-friendly identifier
- `description`: Event description
- `tags`: Array of tags
- `location`: Event location
- `dates`: Array of event dates
- `startingTime` / `endingTime`: Event times
- `registrationLink`: Registration URL
- Social links (Facebook, Instagram, Website)
- `hashtags`: Event hashtags
- `coverImage`: Event cover image
- `eventDisplayImage`: Display thumbnail
- `galleryImages`: Gallery images
- `term`: Reference to Term

### Officer
- `name`: Officer name
- `position`: Position title
- `image`: Profile image
- `roleType`: chief | deputy | committee | member
- `order`: Display order
- Social links (Facebook, GitHub, LinkedIn, etc.)

### Department
- `name`: Full department name
- `tabName`: Short name for tabs
- `description`: Department description
- `order`: Display order
- `term`: Reference to Term

### DepartmentOfficer
Links officers to departments with ordering:
- `department`: Reference to Department
- `officer`: Reference to Officer
- `order`: Display order within section
- `section`: special | regular | subDepartment
- `subDepartmentName`: Name if in sub-department
- `subDepartmentDescription`: Description if in sub-department

## Filtering

### Events by Term
Use the `term` field to filter events by academic year:
- In Contentful: Filter by `term.name = "2024-2025"`
- In code: Use `getEventsByTerm("2024-2025")`

### Officers by Term
Officers are organized by departments which are linked to terms:
- In code: Use `getOfficersByTerm("2024-2025")`

### Officer Ordering (2025-2026 and beyond)
For departments with Chief → Deputy Chiefs → Committees:
1. Set `roleType` appropriately (chief, deputy, committee, member)
2. Set `order` for display position within role type
3. Officers are automatically sorted: chiefs first, then deputies, then committees

## Troubleshooting

### Asset Processing Delays
Contentful processes assets asynchronously. If you see "processing in progress" messages, the assets will be available shortly. You can verify in the Contentful Media library.

### Rate Limiting
If you hit rate limits, the script may fail. Wait a minute and retry. Consider adding delays between operations for large datasets.

### Missing Images
Images from external URLs (like Cloudinary) are downloaded and re-uploaded to Contentful. Ensure the URLs are accessible.

