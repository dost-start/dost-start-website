import { Department } from "@/types/officerType";

const department: Department = {
  name: "Marketing Department",
  tabName: "Marketing",
  description:
    "The Marketing Department is responsible for developing and executing marketing strategies, creating promotional content, and managing social media platforms to promote the organization's brand.",
  specialOfficers: [
    {
      name: "Ethan Harris",
      position: "Chief Marketing Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com/in/ethanharris",
      },
    },
    {
      name: "Ava Robinson",
      position: "Deputy Chief Marketing Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        twitter: "https://twitter.com/avarobinson",
      },
    },
  ],
  officers: [
    {
      name: "Liam Jackson",
      position: "Creatives Lead",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        website: "https://liamjackson.com",
      },
    },
    {
      name: "Sophia White",
      position: "Graphics Designer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        instagram: "https://instagram.com/sophiawhite",
      },
    },
    {
      name: "Oliver Green",
      position: "Multimedia Lead",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        youtube: "https://youtube.com/olivergreen",
      },
    },
    {
      name: "Benjamin Adams",
      position: "Photographer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        facebook: "https://facebook.com/benjaminadams",
      },
    },
    {
      name: "Charlotte Young",
      position: "Videographer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        instagram: "https://instagram.com/charlotteyoung",
      },
    },
    {
      name: "Lucas Walker",
      position: "Promotions Lead",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        twitter: "https://twitter.com/lucaswalker",
      },
    },
    {
      name: "Mia Martinez",
      position: "Social Media Manager",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com/in/miamartinez",
      },
    },
  ],
};

export default department;
