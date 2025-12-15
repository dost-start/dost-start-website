/**
 * Content Model Definitions for Contentful
 * These define the structure of content types in Contentful
 */

export interface ContentModelField {
  id: string;
  name: string;
  type: string;
  required: boolean;
  localized?: boolean;
  validations?: unknown[];
  linkType?: string;
  items?: {
    type: string;
    linkType?: string;
    validations?: unknown[];
  };
}

export interface ContentModel {
  id: string;
  name: string;
  description: string;
  displayField: string;
  fields: ContentModelField[];
}

// ============================================
// TERM Content Model
// ============================================
export const termModel: ContentModel = {
  id: "term",
  name: "Term",
  description: "Academic term/year for organizing events and officers (e.g., 2024-2025)",
  displayField: "name",
  fields: [
    {
      id: "name",
      name: "Name",
      type: "Symbol",
      required: true,
      validations: [
        {
          unique: true,
        },
        {
          regexp: {
            pattern: "^\\d{4}-\\d{4}$",
            flags: null,
          },
          message: "Term name must be in format YYYY-YYYY (e.g., 2024-2025)",
        },
      ],
    },
    {
      id: "startDate",
      name: "Start Date",
      type: "Date",
      required: true,
    },
    {
      id: "endDate",
      name: "End Date",
      type: "Date",
      required: true,
    },
    {
      id: "isActive",
      name: "Is Active",
      type: "Boolean",
      required: true,
    },
  ],
};

// ============================================
// EVENT Content Model
// ============================================
export const eventModel: ContentModel = {
  id: "event",
  name: "Event",
  description: "Events organized by START",
  displayField: "title",
  fields: [
    {
      id: "title",
      name: "Title",
      type: "Symbol",
      required: true,
    },
    {
      id: "slug",
      name: "Slug",
      type: "Symbol",
      required: true,
      validations: [
        {
          unique: true,
        },
        {
          regexp: {
            pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
            flags: null,
          },
          message: "Slug must be URL-friendly (lowercase letters, numbers, and hyphens)",
        },
      ],
    },
    {
      id: "description",
      name: "Description",
      type: "Text",
      required: true,
    },
    {
      id: "tags",
      name: "Tags",
      type: "Array",
      required: false,
      items: {
        type: "Symbol",
      },
    },
    {
      id: "location",
      name: "Location",
      type: "Symbol",
      required: false,
    },
    {
      id: "dates",
      name: "Event Dates",
      type: "Array",
      required: true,
      items: {
        type: "Symbol",
      },
    },
    {
      id: "startingTime",
      name: "Starting Time",
      type: "Symbol",
      required: false,
    },
    {
      id: "endingTime",
      name: "Ending Time",
      type: "Symbol",
      required: false,
    },
    {
      id: "registrationLink",
      name: "Registration Link",
      type: "Symbol",
      required: false,
      validations: [
        {
          regexp: {
            pattern: "^(https?:\\/\\/)?[\\w\\-]+(\\.[\\w\\-]+)+[/#?]?.*$|^$",
            flags: null,
          },
          message: "Must be a valid URL",
        },
      ],
    },
    {
      id: "facebookLink",
      name: "Facebook Link",
      type: "Symbol",
      required: false,
    },
    {
      id: "instagramLink",
      name: "Instagram Link",
      type: "Symbol",
      required: false,
    },
    {
      id: "websiteLink",
      name: "Website Link",
      type: "Symbol",
      required: false,
    },
    {
      id: "hashtags",
      name: "Hashtags",
      type: "Array",
      required: false,
      items: {
        type: "Symbol",
      },
    },
    {
      id: "coverImage",
      name: "Cover Image",
      type: "Link",
      linkType: "Asset",
      required: true,
    },
    {
      id: "eventDisplayImage",
      name: "Event Display Image",
      type: "Link",
      linkType: "Asset",
      required: true,
    },
    {
      id: "galleryImages",
      name: "Gallery Images",
      type: "Array",
      required: false,
      items: {
        type: "Link",
        linkType: "Asset",
      },
    },
    {
      id: "term",
      name: "Term",
      type: "Link",
      linkType: "Entry",
      required: true,
      validations: [
        {
          linkContentType: ["term"],
        },
      ],
    },
  ],
};

// ============================================
// OFFICER Content Model
// ============================================
export const officerModel: ContentModel = {
  id: "officer",
  name: "Officer",
  description: "Individual officer/member of START",
  displayField: "name",
  fields: [
    {
      id: "name",
      name: "Name",
      type: "Symbol",
      required: true,
    },
    {
      id: "position",
      name: "Position",
      type: "Symbol",
      required: true,
    },
    {
      id: "image",
      name: "Profile Image",
      type: "Link",
      linkType: "Asset",
      required: true,
    },
    {
      id: "roleType",
      name: "Role Type",
      type: "Symbol",
      required: true,
      validations: [
        {
          in: ["chief", "deputy", "committee", "member"],
        },
      ],
    },
    {
      id: "order",
      name: "Display Order",
      type: "Integer",
      required: true,
    },
    {
      id: "facebookLink",
      name: "Facebook",
      type: "Symbol",
      required: false,
    },
    {
      id: "githubLink",
      name: "GitHub",
      type: "Symbol",
      required: false,
    },
    {
      id: "linkedinLink",
      name: "LinkedIn",
      type: "Symbol",
      required: false,
    },
    {
      id: "instagramLink",
      name: "Instagram",
      type: "Symbol",
      required: false,
    },
    {
      id: "websiteLink",
      name: "Website",
      type: "Symbol",
      required: false,
    },
    {
      id: "behanceLink",
      name: "Behance",
      type: "Symbol",
      required: false,
    },
    {
      id: "youtubeLink",
      name: "YouTube",
      type: "Symbol",
      required: false,
    },
    {
      id: "twitterLink",
      name: "Twitter/X",
      type: "Symbol",
      required: false,
    },
  ],
};

// ============================================
// DEPARTMENT Content Model
// ============================================
export const departmentModel: ContentModel = {
  id: "department",
  name: "Department",
  description: "Department within START organization",
  displayField: "name",
  fields: [
    {
      id: "name",
      name: "Name",
      type: "Symbol",
      required: true,
    },
    {
      id: "tabName",
      name: "Tab Name",
      type: "Symbol",
      required: true,
    },
    {
      id: "description",
      name: "Description",
      type: "Text",
      required: true,
    },
    {
      id: "order",
      name: "Display Order",
      type: "Integer",
      required: true,
    },
    {
      id: "term",
      name: "Term",
      type: "Link",
      linkType: "Entry",
      required: true,
      validations: [
        {
          linkContentType: ["term"],
        },
      ],
    },
  ],
};

// ============================================
// DEPARTMENT OFFICER Content Model
// Links officers to departments with section info
// ============================================
export const departmentOfficerModel: ContentModel = {
  id: "departmentOfficer",
  name: "Department Officer",
  description: "Links officers to departments with ordering and section info",
  displayField: "order",
  fields: [
    {
      id: "department",
      name: "Department",
      type: "Link",
      linkType: "Entry",
      required: true,
      validations: [
        {
          linkContentType: ["department"],
        },
      ],
    },
    {
      id: "officer",
      name: "Officer",
      type: "Link",
      linkType: "Entry",
      required: true,
      validations: [
        {
          linkContentType: ["officer"],
        },
      ],
    },
    {
      id: "order",
      name: "Display Order",
      type: "Integer",
      required: true,
    },
    {
      id: "section",
      name: "Section",
      type: "Symbol",
      required: true,
      validations: [
        {
          in: ["special", "regular", "subDepartment"],
        },
      ],
    },
    {
      id: "subDepartmentName",
      name: "Sub-Department Name",
      type: "Symbol",
      required: false,
    },
    {
      id: "subDepartmentDescription",
      name: "Sub-Department Description",
      type: "Text",
      required: false,
    },
  ],
};

// Export all models
export const contentModels: ContentModel[] = [
  termModel,
  eventModel,
  officerModel,
  departmentModel,
  departmentOfficerModel,
];

