import { Department } from "@/types/officerType";

const department: Department = {
  name: "Finance Department",
  tabName: "Finance",
  description:
    "The Finance Department is responsible for managing the organization's financial planning, budgeting, and procurement processes.",
  specialOfficers: [
    {
      name: "Ethan Moore",
      position: "Chief Finance Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com/in/ethanmoore",
        twitter: "https://twitter.com/ethanmoore",
      },
    },
    {
      name: "Sophia Wilson",
      position: "Deputy Chief Finance Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com/in/sophiawilson",
        twitter: "https://twitter.com/sophiawilson",
      },
    },
  ],
  officers: [
    {
      name: "Liam Turner",
      position: "Budget and Accounting Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com/in/liamturner",
        twitter: "https://twitter.com/liamturner",
      },
    },
    {
      name: "Olivia Carter",
      position: "Procurement Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com/in/oliviacarter",
        twitter: "https://twitter.com/oliviacarter",
      },
    },
    {
      name: "Benjamin Lee",
      position: "Canvasser",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com/in/benjaminlee",
        twitter: "https://twitter.com/benjaminlee",
      },
    },
  ],
};

export default department;
