/**
 * Contentful Officer Functions
 * 
 * Functions to fetch and transform officers from Contentful
 * Includes caching, image optimization, and parallel fetching
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { Asset } from "contentful";
import { 
  getClient, 
  getProfileImageUrl, 
  isContentfulConfigured,
  CACHE_REVALIDATE_SECONDS,
  CACHE_TAGS,
} from "./client";
import { Officer, Department, BatchYear, BatchYears } from "@/types/officerType";

// Transform Contentful officer to local Officer type
function transformOfficer(entry: any): Officer & { order: number; roleType: string } {
  const fields = entry.fields;
  
  return {
    name: fields.name,
    position: fields.position,
    imageSrc: getProfileImageUrl(fields.image as Asset),
    order: fields.order || 0,
    roleType: fields.roleType || "member",
    socialLinks: {
      facebook: fields.facebookLink,
      github: fields.githubLink,
      linkedin: fields.linkedinLink,
      instagram: fields.instagramLink,
      website: fields.websiteLink,
      behance: fields.behanceLink,
      youtube: fields.youtubeLink,
      twitter: fields.twitterLink,
    },
  };
}

// Sort officers by role type then order
const roleOrder = { chief: 0, deputy: 1, committee: 2, member: 3 };
function sortOfficers(a: Officer & { order: number; roleType?: string }, b: Officer & { order: number; roleType?: string }) {
  const roleA = roleOrder[a.roleType as keyof typeof roleOrder] ?? 3;
  const roleB = roleOrder[b.roleType as keyof typeof roleOrder] ?? 3;
  if (roleA !== roleB) return roleA - roleB;
  return a.order - b.order;
}

/**
 * Build departments from raw Contentful data
 */
function buildDepartments(
  departmentItems: any[],
  linkItems: any[]
): Department[] {
  return departmentItems.map((deptEntry: any) => {
    const deptFields = deptEntry.fields;
    
    const deptLinks = linkItems.filter(
      (link: any) => link.fields.department?.sys?.id === deptEntry.sys.id
    );

    const specialOfficers: (Officer & { order: number })[] = [];
    const regularOfficers: (Officer & { order: number })[] = [];
    const subDepartmentMap: Map<string, {
      name: string;
      description: string;
      officers: (Officer & { order: number })[];
    }> = new Map();

    for (const link of deptLinks) {
      if (!link.fields.officer) continue;
      
      const officer = transformOfficer(link.fields.officer);
      officer.order = link.fields.order || 0;

      switch (link.fields.section) {
        case "special":
          specialOfficers.push(officer);
          break;
        case "subDepartment": {
          const subDeptName = link.fields.subDepartmentName || "Other";
          if (!subDepartmentMap.has(subDeptName)) {
            subDepartmentMap.set(subDeptName, {
              name: subDeptName,
              description: link.fields.subDepartmentDescription || "",
              officers: [],
            });
          }
          subDepartmentMap.get(subDeptName)!.officers.push(officer);
          break;
        }
        default:
          regularOfficers.push(officer);
      }
    }

    specialOfficers.sort(sortOfficers);
    regularOfficers.sort(sortOfficers);

    const subDepartments = Array.from(subDepartmentMap.values()).map((subDept) => ({
      ...subDept,
      officers: subDept.officers.sort(sortOfficers),
    }));

    return {
      name: deptFields.name,
      tabName: deptFields.tabName,
      description: deptFields.description,
      specialOfficers,
      officers: regularOfficers,
      subDepartment: subDepartments.length > 0 ? subDepartments : undefined,
    };
  });
}

/**
 * Fetch officers by term ID (optimized with parallel fetching)
 */
async function fetchOfficersByTermId(
  termId: string,
  termName: string,
  preview: boolean
): Promise<BatchYear> {
  const client = getClient(preview);
  if (!client) return { year: termName, departments: [] };

  // Fetch departments and links in PARALLEL
  const [departmentsResponse, linksResponse] = await Promise.all([
    client.getEntries({
      content_type: "department",
      "fields.term.sys.id": termId,
      order: ["fields.order"],
      include: 1,
      limit: 100,
    }),
    client.getEntries({
      content_type: "departmentOfficer",
      order: ["fields.order"],
      include: 2,
      limit: 500,
    }),
  ]);

  // Filter links to only those belonging to this term's departments
  const deptIds = new Set(departmentsResponse.items.map((d: any) => d.sys.id));
  const filteredLinks = linksResponse.items.filter(
    (link: any) => link.fields.department?.sys?.id && deptIds.has(link.fields.department.sys.id)
  );

  const departments = buildDepartments(departmentsResponse.items, filteredLinks);

  return { year: termName, departments };
}

/**
 * Internal function to fetch officers by term name
 */
async function fetchOfficersByTermInternal(
  termName: string,
  preview: boolean
): Promise<BatchYear | null> {
  const client = getClient(preview);
  if (!client) return null;

  // Find the term ID
  const termsResponse = await client.getEntries({
    content_type: "term",
    "fields.name": termName,
    limit: 1,
    select: ["sys.id", "fields.name"],
  });

  if (termsResponse.items.length === 0) {
    console.warn(`Term "${termName}" not found`);
    return null;
  }

  const termId = termsResponse.items[0].sys.id;
  return fetchOfficersByTermId(termId, termName, preview);
}

/**
 * Fetch ALL batch years in a single optimized query
 */
async function fetchAllBatchYearsInternal(preview: boolean): Promise<BatchYears> {
  const client = getClient(preview);
  if (!client) return { batchYears: [] };

  // Fetch ALL data in parallel - single round trip for each content type
  const [termsResponse, allDepartments, allLinks] = await Promise.all([
    client.getEntries({
      content_type: "term",
      order: ["-fields.name"],
      select: ["sys.id", "fields.name", "fields.isActive"],
      limit: 20,
    }),
    client.getEntries({
      content_type: "department",
      order: ["fields.order"],
      include: 1,
      limit: 200,
    }),
    client.getEntries({
      content_type: "departmentOfficer",
      order: ["fields.order"],
      include: 2,
      limit: 1000,
    }),
  ]);

  // Group departments by term
  const departmentsByTerm = new Map<string, any[]>();
  for (const dept of allDepartments.items) {
    const termId = (dept.fields as any).term?.sys?.id;
    if (!termId) continue;
    if (!departmentsByTerm.has(termId)) {
      departmentsByTerm.set(termId, []);
    }
    departmentsByTerm.get(termId)!.push(dept);
  }

  // Build batch years
  const batchYears: BatchYear[] = termsResponse.items.map((term: any) => {
    const termDepts = departmentsByTerm.get(term.sys.id) || [];
    const deptIds = new Set(termDepts.map((d: any) => d.sys.id));

    // Filter links for this term's departments
    const termLinks = allLinks.items.filter(
      (link: any) => link.fields.department?.sys?.id && deptIds.has(link.fields.department.sys.id)
    );

    const departments = buildDepartments(termDepts, termLinks);

    return {
      year: term.fields.name,
      departments,
    };
  });

  return { batchYears };
}

/**
 * Get officers by term (with caching)
 */
export const getOfficersByTerm = cache(async (
  termName: string,
  preview = false
): Promise<BatchYear | null> => {
  if (!isContentfulConfigured()) {
    console.warn("Contentful not configured, returning null");
    return null;
  }

  try {
    const getCachedOfficersByTerm = unstable_cache(
      async () => fetchOfficersByTermInternal(termName, preview),
      [`contentful-officers-term-${termName}`],
      {
        revalidate: CACHE_REVALIDATE_SECONDS,
        tags: [CACHE_TAGS.officers, CACHE_TAGS.departments, CACHE_TAGS.terms],
      }
    );

    return await getCachedOfficersByTerm();
  } catch (error) {
    console.error("Error fetching officers by term from Contentful:", error);
    return null;
  }
});

/**
 * Get all batch years with officers (with caching)
 * OPTIMIZED: Fetches all content types in parallel, then assembles locally
 */
export const getAllBatchYears = cache(async (preview = false): Promise<BatchYears> => {
  if (!isContentfulConfigured()) {
    return { batchYears: [] };
  }

  try {
    const getCachedAllBatchYears = unstable_cache(
      async () => fetchAllBatchYearsInternal(preview),
      ["contentful-all-batch-years"],
      {
        revalidate: CACHE_REVALIDATE_SECONDS,
        tags: [CACHE_TAGS.officers, CACHE_TAGS.departments, CACHE_TAGS.terms],
      }
    );

    return await getCachedAllBatchYears();
  } catch (error) {
    console.error("Error fetching all batch years from Contentful:", error);
    return { batchYears: [] };
  }
});

/**
 * Get available terms for officers (with caching)
 */
export const getOfficerTerms = cache(async (
  preview = false
): Promise<{ name: string; isActive: boolean }[]> => {
  const client = getClient(preview);
  
  if (!client || !isContentfulConfigured()) {
    return [];
  }

  try {
    const getCachedOfficerTerms = unstable_cache(
      async () => {
        const response = await client.getEntries({
          content_type: "term",
          order: ["-fields.name"],
          select: ["sys.id", "fields.name", "fields.isActive"],
        });

        return response.items.map((item: any) => ({
          name: item.fields.name,
          isActive: item.fields.isActive,
        }));
      },
      ["contentful-officer-terms"],
      {
        revalidate: CACHE_REVALIDATE_SECONDS,
        tags: [CACHE_TAGS.terms],
      }
    );

    return await getCachedOfficerTerms();
  } catch (error) {
    console.error("Error fetching officer terms from Contentful:", error);
    return [];
  }
});
