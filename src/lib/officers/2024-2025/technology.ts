import { Department } from "@/types/officerType";

const department: Department = {
  name: "Technology Department",
  tabName: "Technology",
  description:
    "The Technology Department is responsible for overseeing the development and maintenance of the organization's technological infrastructure, including software development, cybersecurity, and system architecture.",
  specialOfficers: [
    {
      name: "Harold James D. Cruz",
      position: "Chief Technology Officer",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747126467/1Z59Phl_hqo9eo.png",
      socialLinks: {
        github: "https://github.com/Harome",
        linkedin: "https://www.linkedin.com/in/harome/",
      },
    },
    {
      name: "John Roice Aldeza",
      position: "Deputy Chief Technology Officer",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747126486/profile_m8vfdh.png",
      socialLinks: {
        github: "https://github.com/roiceee",
        linkedin: "https://linkedin.com/in/johnroicealdeza",
        website: "https://roice.xyz",
      },
    },
  ],
  officers: [
    {
      name: "John Patrick DP. Ancajas",
      position: "Web Development Lead",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747126506/C1QPNZn_fufjkz.png",
      socialLinks: {
        facebook:
          "https://www.facebook.com/profile.php?id=100082552025420&mibextid=2JQ9oc",
        github: "https://github.com/JohnPatrickAncajas",
        linkedin: "www.linkedin.com/in/john-patrick-ancajas",
      },
    },
    {
      name: "Edward Jerome Magtoto",
      position: "Backend Development Lead",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747126527/WhsL8Nw_fvcxn5.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/edwardjeromemagtoto/",
        github: "https://github.com/KingEddeh",
      },
    },
    {
      name: "Rai Peladas",
      position: "Data and AI Lead",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747126547/3txwSxQ_vuxxnt.png",
      socialLinks: {
        github: "omoraisu (Rai Peladas)",
        linkedin: "(4) Rai Peladas | LinkedIn",
        instagram: "onigirai",
      },
    },
    {
      name: "Mark Jayson T. Agao",
      position: "UI/UX Designer",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747126568/8zmzmoC_uq0moa.png",
      socialLinks: {
        facebook: "Facebook",
        github: "Mark-Jayson (Mark Jayson Agao)",
        linkedin: "LinkedIn",
      },
    },
  ],
};

export default department;
