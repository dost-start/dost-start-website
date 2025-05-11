import { Department } from "@/types/officerType";

const department: Department = {
  name: "Communications Department",
  tabName: "Communication",
  description: "The Communications Department is responsible for managing the organization's social media accounts, website, and email communications.",
  specialOfficers: [
    {
      name: "Anasel Caneso",
      position: "Deputy Chief Communications Officer",
      imageSrc: "https://i.imgur.com/Z1ZxJfZ.png",
      socialLinks: {
        facebook: "fb.com/eynasilaceey",
        linkedin: "http://linkedin.com/in/anasel-ace",
        instagram: "https://www.instagram.com/anaselace",
      }
    }
  ],
  officers: [
    {
      name: "Marvin James A. Erosa",
      position: "Partnership Lead",
      imageSrc: "https://i.imgur.com/m7pajph.jpeg",
      socialLinks: {
        facebook: "https://www.facebook.com/marvinjameserosa",
        github: "https://github.com/marvinjameseros",
        linkedin: "https://www.linkedin.com/in/marvinjameserosa/",
      }
    },
    {
      name: "Anthony Karl M. Miranda",
      position: "External Management Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/akmrndd",
        linkedin: "https://www.linkedin.com/in/akmrnd/",
        instagram: "https://www.instagram.com/akmrnd_/",
      }
    },
    {
      name: "Andrei Rouiz Pascual",
      position: "Chief Communications Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        twitter: "https://www.facebook.com/pscl.ndr"
      }
    },
  ]
};
export default department;
