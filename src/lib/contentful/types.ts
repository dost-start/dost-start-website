/**
 * Contentful Types for the START Website
 * These types represent the content models in Contentful
 */

// ============================================
// TERM - Used to organize events and officers by academic year
// ============================================
export interface ContentfulTerm {
  sys: {
    id: string;
    contentType: { sys: { id: "term" } };
  };
  fields: {
    name: string; // e.g., "2024-2025"
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    isActive: boolean;
  };
}

// ============================================
// EVENT
// ============================================
export interface ContentfulEvent {
  sys: {
    id: string;
    contentType: { sys: { id: "event" } };
  };
  fields: {
    title: string;
    slug: string;
    description: string;
    tags: string[];
    location?: string;
    dates: string[]; // Array of ISO date strings
    startingTime?: string;
    endingTime?: string;
    registrationLink?: string;
    facebookLink?: string;
    instagramLink?: string;
    websiteLink?: string;
    hashtags: string[];
    coverImage: ContentfulAsset;
    eventDisplayImage: ContentfulAsset;
    galleryImages?: ContentfulAsset[];
    term: ContentfulTermReference; // Reference to Term
  };
}

// ============================================
// OFFICER
// ============================================
export interface ContentfulOfficer {
  sys: {
    id: string;
    contentType: { sys: { id: "officer" } };
  };
  fields: {
    name: string;
    position: string;
    image: ContentfulAsset;
    facebookLink?: string;
    githubLink?: string;
    linkedinLink?: string;
    instagramLink?: string;
    websiteLink?: string;
    behanceLink?: string;
    youtubeLink?: string;
    twitterLink?: string;
    // For ordering within a department
    order: number;
    // Role type for proper ordering: chief > deputy > committee
    roleType: "chief" | "deputy" | "committee" | "member";
  };
}

// ============================================
// DEPARTMENT
// ============================================
export interface ContentfulDepartment {
  sys: {
    id: string;
    contentType: { sys: { id: "department" } };
  };
  fields: {
    name: string;
    tabName: string;
    description: string;
    order: number; // For ordering departments within a term
    term: ContentfulTermReference; // Reference to Term
    // Officers are linked via reverse relationship or queried separately
    officers: ContentfulOfficerReference[];
  };
}

// ============================================
// DEPARTMENT OFFICER ASSIGNMENT
// Links officers to departments with ordering
// ============================================
export interface ContentfulDepartmentOfficer {
  sys: {
    id: string;
    contentType: { sys: { id: "departmentOfficer" } };
  };
  fields: {
    department: ContentfulDepartmentReference;
    officer: ContentfulOfficerReference;
    order: number;
    section: "special" | "regular" | "subDepartment";
    subDepartmentName?: string;
    subDepartmentDescription?: string;
  };
}

// ============================================
// Helper Types
// ============================================
export interface ContentfulAsset {
  sys: { id: string };
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface ContentfulTermReference {
  sys: {
    type: "Link";
    linkType: "Entry";
    id: string;
  };
}

export interface ContentfulOfficerReference {
  sys: {
    type: "Link";
    linkType: "Entry";
    id: string;
  };
}

export interface ContentfulDepartmentReference {
  sys: {
    type: "Link";
    linkType: "Entry";
    id: string;
  };
}

// ============================================
// Transformed Types for Frontend Use
// ============================================
export interface Term {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface TransformedEvent {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  description: string;
  location?: string;
  date: Date[];
  startingTime?: string;
  endingTime?: string;
  registrationLink?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    website?: string;
  };
  hashtags: string[];
  coverImage: string;
  eventDisplayImage: string;
  images?: string[];
  termId: string;
  termName: string;
}

export interface TransformedOfficer {
  id: string;
  name: string;
  position: string;
  imageSrc: string;
  order: number;
  roleType: "chief" | "deputy" | "committee" | "member";
  socialLinks: {
    facebook?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
    behance?: string;
    youtube?: string;
    twitter?: string;
  };
}

export interface TransformedDepartment {
  id: string;
  name: string;
  tabName: string;
  description: string;
  order: number;
  specialOfficers: TransformedOfficer[];
  officers: TransformedOfficer[];
  subDepartment?: {
    name: string;
    description: string;
    officers: TransformedOfficer[];
  }[];
}

export interface TransformedBatchYear {
  termId: string;
  year: string;
  departments: TransformedDepartment[];
}

