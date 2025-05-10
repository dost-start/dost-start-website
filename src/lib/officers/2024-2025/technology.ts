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
      imageSrc: "https://i.imgur.com/1Z59Phl.png",
      socialLinks: {
        github: "https://github.com/Harome",
        linkedin: "https://www.linkedin.com/in/harome/",
      },
    },
    {
      name: "John Roice Aldeza",
      position: "Deputy Chief Technology Officer",
      imageSrc: "https://www.roice.xyz/profile.png",
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
      imageSrc: "https://i.imgur.com/C1QPNZn.png",
      socialLinks: {
        facebook: "https://www.facebook.com/profile.php?id=100082552025420&mibextid=2JQ9oc",
        github: "https://github.com/JohnPatrickAncajas",
        linkedin: "www.linkedin.com/in/john-patrick-ancajas",
      },
    },
    {
      name: "Edward Jerome Magtoto",
      position: "Backend Development Lead",
      imageSrc: "https://i.imgur.com/WhsL8Nw.jpeg",
      socialLinks: {
        facebook: "https://www.facebook.com/edwardjeromemagtoto/",
        github: "https://github.com/KingEddeh",
      },
    },
    {
      name: "Rai Peladas",
      position: "Data and AI Lead",
      imageSrc: "https://i.imgur.com/3txwSxQ.png",
      socialLinks: {
        github: "omoraisu (Rai Peladas)",
        linkedin: "(4) Rai Peladas | LinkedIn",
        instagram: "onigirai",
      },
    },
    {
      name: "Mark Jayson T. Agao",
      position: "UI/UX Designer",
      imageSrc: "https://i.imgur.com/8zmzmoC.png",
      socialLinks: {
        facebook: "Facebook",
        github: "Mark-Jayson (Mark Jayson Agao)",
        linkedin: "LinkedIn",
      },
    },
  ],
};

export default department;
