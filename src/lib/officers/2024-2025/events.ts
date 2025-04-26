import { Department } from "@/types/officerType";

const department: Department = {
  name: "Events Department",
  tabName: "Events",
  description:
    "The Events Department is responsible for planning, organizing, and executing events, managing logistics, and ensuring the smooth operation of all activities.",
  specialOfficers: [
    {
      name: "Ethan Peterson",
      position: "Chief Events Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com/in/ethanpeterson",
      },
    },
    {
      name: "Olivia Harris",
      position: "Deputy Chief Events Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        twitter: "https://twitter.com/oliviaharris",
      },
    },
  ],
  officers: [
    {
      name: "Charlotte Green",
      position: "Program Management Lead",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        website: "https://charlottegreen.com",
      },
    },
    {
      name: "James Thompson",
      position: "Event Coordinator",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        instagram: "https://instagram.com/jamesthompson",
      },
    },
    {
      name: "Liam Mitchell",
      position: "Logistics Lead",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        github: "https://github.com/liammitch",
      },
    },
    {
      name: "Ava Johnson",
      position: "Resource Management Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com/in/avajohnson",
      },
    },
    {
      name: "Lucas Brown",
      position: "Technical Lead",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        facebook: "https://facebook.com/lucasbrown",
      },
    },
    {
      name: "Sophia Carter",
      position: "Safety Lead",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        youtube: "https://youtube.com/sophiacarter",
      },
    },
    {
      name: "Benjamin Davis",
      position: "Venue Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        website: "https://benjamindavis.com",
      },
    },
    {
      name: "Emily Scott",
      position: "AV Technician",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        instagram: "https://instagram.com/emilyscott",
      },
    },
  ],
  subDepartment: [
    {
      name: "Public Relations",
      description:
        "The Public Relations sub-department is responsible for managing the department's image and communication with the public.",
      officers: [
        {
          name: "Mia Wilson",
          position: "PR Lead",
          imageSrc: "/profile-placeholder.jpg",
          socialLinks: {
            linkedin: "https://linkedin.com/in/miawilson",
          },
        },
        {
          name: "Noah Martinez",
          position: "Media Officer",
          imageSrc: "/profile-placeholder.jpg",
          socialLinks: {
            twitter: "https://twitter.com/noahmartinez",
          },
        },
      ],
    },
  ],
};

export default department;
