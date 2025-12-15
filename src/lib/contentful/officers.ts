/**
 * Contentful Officer Functions
 * 
 * Functions to fetch and transform officers from Contentful
 */

import { Entry, Asset, EntryCollection } from "contentful";
import { getClient, getAssetUrl, isContentfulConfigured } from "./client";
import { Officer, Department, BatchYear, BatchYears } from "@/types/officerType";

// Contentful field types
interface ContentfulOfficerFields {
  name: string;
  position: string;
  image: Asset;
  roleType: "chief" | "deputy" | "committee" | "member";
  order: number;
  facebookLink?: string;
  githubLink?: string;
  linkedinLink?: string;
  instagramLink?: string;
  websiteLink?: string;
  behanceLink?: string;
  youtubeLink?: string;
  twitterLink?: string;
}

interface ContentfulDepartmentFields {
  name: string;
  tabName: string;
  description: string;
  order: number;
  term: Entry<{ name: string }>;
}

interface ContentfulDepartmentOfficerFields {
  department: Entry<ContentfulDepartmentFields>;
  officer: Entry<ContentfulOfficerFields>;
  order: number;
  section: "special" | "regular" | "subDepartment";
  subDepartmentName?: string;
  subDepartmentDescription?: string;
}

// Transform Contentful officer to local Officer type
function transformOfficer(entry: Entry<ContentfulOfficerFields>): Officer & { order: number; roleType: string } {
  const fields = entry.fields;
  
  return {
    name: fields.name,
    position: fields.position,
    imageSrc: getAssetUrl(fields.image),
    order: fields.order,
    roleType: fields.roleType,
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

/**
 * Get all officers organized by term and department
 */
export async function getOfficersByTerm(
  termName: string,
  preview = false
): Promise<BatchYear | null> {
  const client = getClient(preview);
  
  if (!client || !isContentfulConfigured()) {
    console.warn("Contentful not configured, returning null");
    return null;
  }

  try {
    // First, find the term ID
    const termsResponse = await client.getEntries<{ name: string }>({
      content_type: "term",
      "fields.name": termName,
      limit: 1,
    });

    if (termsResponse.items.length === 0) {
      console.warn(`Term "${termName}" not found`);
      return null;
    }

    const termId = termsResponse.items[0].sys.id;

    // Get all departments for this term
    const departmentsResponse: EntryCollection<ContentfulDepartmentFields> = 
      await client.getEntries({
        content_type: "department",
        "fields.term.sys.id": termId,
        order: ["fields.order"],
        include: 2,
      });

    // Get all department-officer links for this term's departments
    const deptIds = departmentsResponse.items.map((d) => d.sys.id);
    
    if (deptIds.length === 0) {
      return {
        year: termName,
        departments: [],
      };
    }

    const linksResponse: EntryCollection<ContentfulDepartmentOfficerFields> = 
      await client.getEntries({
        content_type: "departmentOfficer",
        "fields.department.sys.id[in]": deptIds.join(","),
        order: ["fields.order"],
        include: 3, // Include department, officer, and their linked assets
      });

    // Build departments with officers
    const departments: Department[] = departmentsResponse.items.map((deptEntry) => {
      const deptFields = deptEntry.fields;
      
      // Find all officer links for this department
      const deptLinks = linksResponse.items.filter(
        (link) => link.fields.department?.sys?.id === deptEntry.sys.id
      );

      // Separate officers by section
      const specialOfficers: (Officer & { order: number })[] = [];
      const regularOfficers: (Officer & { order: number })[] = [];
      const subDepartmentMap: Map<string, {
        name: string;
        description: string;
        officers: (Officer & { order: number })[];
      }> = new Map();

      for (const link of deptLinks) {
        if (!link.fields.officer) continue;
        
        const officer = transformOfficer(
          link.fields.officer as unknown as Entry<ContentfulOfficerFields>
        );
        officer.order = link.fields.order;

        switch (link.fields.section) {
          case "special":
            specialOfficers.push(officer);
            break;
          case "subDepartment":
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
          default:
            regularOfficers.push(officer);
        }
      }

      // Sort officers by order, then by role type (chief > deputy > committee > member)
      const roleOrder = { chief: 0, deputy: 1, committee: 2, member: 3 };
      const sortOfficers = (a: Officer & { order: number; roleType?: string }, b: Officer & { order: number; roleType?: string }) => {
        const roleA = roleOrder[a.roleType as keyof typeof roleOrder] ?? 3;
        const roleB = roleOrder[b.roleType as keyof typeof roleOrder] ?? 3;
        if (roleA !== roleB) return roleA - roleB;
        return a.order - b.order;
      };

      specialOfficers.sort(sortOfficers);
      regularOfficers.sort(sortOfficers);

      // Sort sub-department officers
      const subDepartments = Array.from(subDepartmentMap.values()).map((subDept) => ({
        ...subDept,
        officers: subDept.officers.sort(sortOfficers),
      }));

      return {
        name: deptFields.name,
        tabName: deptFields.tabName,
        description: deptFields.description,
        specialOfficers: specialOfficers,
        officers: regularOfficers,
        subDepartment: subDepartments.length > 0 ? subDepartments : undefined,
      };
    });

    return {
      year: termName,
      departments,
    };
  } catch (error) {
    console.error("Error fetching officers by term from Contentful:", error);
    return null;
  }
}

/**
 * Get all batch years with officers
 */
export async function getAllBatchYears(preview = false): Promise<BatchYears> {
  const client = getClient(preview);
  
  if (!client || !isContentfulConfigured()) {
    return { batchYears: [] };
  }

  try {
    // Get all terms
    const termsResponse = await client.getEntries<{ name: string; isActive: boolean }>({
      content_type: "term",
      order: ["-fields.name"],
    });

    const batchYears: BatchYear[] = [];

    for (const term of termsResponse.items) {
      const batchYear = await getOfficersByTerm(term.fields.name, preview);
      if (batchYear) {
        batchYears.push(batchYear);
      }
    }

    return { batchYears };
  } catch (error) {
    console.error("Error fetching all batch years from Contentful:", error);
    return { batchYears: [] };
  }
}

/**
 * Get available terms for officers
 */
export async function getOfficerTerms(
  preview = false
): Promise<{ name: string; isActive: boolean }[]> {
  const client = getClient(preview);
  
  if (!client || !isContentfulConfigured()) {
    return [];
  }

  try {
    const response = await client.getEntries<{ name: string; isActive: boolean }>({
      content_type: "term",
      order: ["-fields.name"],
    });

    return response.items.map((item) => ({
      name: item.fields.name,
      isActive: item.fields.isActive,
    }));
  } catch (error) {
    console.error("Error fetching officer terms from Contentful:", error);
    return [];
  }
}

