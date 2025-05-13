import { Department } from "@/types/officerType";

const department: Department = {
  name: "Communications Department",
  tabName: "Communication",
  description:
    "The Communications Department is responsible for managing the organization's social media accounts, website, and email communications.",
  specialOfficers: [
    {
      name: "Andrei Rouiz Pascual",
      position: "Chief Communications Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/pscl.ndr",
      },
    },
    {
      name: "Anasel Caneso",
      position: "Deputy Chief Communications Officer",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747125676/Z1ZxJfZ_bmg1bw.png",
      socialLinks: {
        facebook: "fb.com/eynasilaceey",
        linkedin: "http://linkedin.com/in/anasel-ace",
        instagram: "https://www.instagram.com/anaselace",
      },
    },
  ],
  officers: [
    {
      name: "Marvin James A. Erosa",
      position: "Partnership Lead",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747125707/m7pajph_vtqjks.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/marvinjameserosa",
        github: "https://github.com/marvinjameseros",
        linkedin: "https://www.linkedin.com/in/marvinjameserosa/",
      },
    },
    {
      name: "Anthony Karl M. Miranda",
      position: "External Management Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/akmrndd",
        linkedin: "https://www.linkedin.com/in/akmrnd/",
        instagram: "https://www.instagram.com/akmrnd_/",
      },
    },
    {
      name: "Andrei Rouiz Pascual",
      position: "Chief Communications Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        twitter: "https://www.facebook.com/pscl.ndr",
      },
    },
  ],
};
export default department;
