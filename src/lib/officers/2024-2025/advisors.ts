import { Department } from "@/types/officerType";

const advisors: Department = {
  name: "Advisors",
  tabName: "Advisors",
  description:
    "Provides guidance and support to the organization, leveraging their expertise and experience to help navigate challenges and seize opportunities.",
  specialOfficers: [
    {
      name: "Robby Reyes",
      position: "Organization Advisor",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747125343/1666789664908_uw5ibv.jpg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/robby-reyes-672a42145",
      },
    },
    {
      name: "Bon David Bacuño",
      position: "Technical Advisor",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747125343/1676963834512_v9tv3a.jpg",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/bon-david-bacuno/",
      },
    },
  ],
  officers: [],
};

export default advisors;
