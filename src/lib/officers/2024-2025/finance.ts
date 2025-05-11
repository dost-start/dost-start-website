import { Department } from "@/types/officerType";

const department: Department = {
  name: "Finance Department",
  tabName: "Finance",
  description:
    "The Finance Department is responsible for managing the organization's financial planning, budgeting, and procurement processes.",
  specialOfficers: [
    {
      name: "Mark Gelson E. Panganoron",
      position: "Chief Finance Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/markgelson.panganoron.1",
      },
    },
    {
      name: "Al-abass D. Ibrahim",
      position: "Deputy Chief Finance Officer",
      imageSrc: "https://i.imgur.com/u42q3Zv.jpeg",
      socialLinks: {
        facebook: "https://www.facebook.com/abass.ibrahim.0713",
        github: "https://github.com/yuuwa13",
        linkedin: "https://www.linkedin.com/in/al-abass-ibrahim-a0865227a/?trk=opento_sprofile_details",
      },
    },
  ],
  officers: [
    {
      name: "Muttia Selgas",
      position: "Budget and Accounting Officer",
      imageSrc: "https://i.imgur.com/eQhvSDF.png",
      socialLinks: {
        facebook: "https://www.facebook.com/selgas.16",
        github: "https://github.com/MuttiaSelgas",
        linkedin: "https://www.linkedin.com/in/muttia-selgas-549350338/",
      },
    },
    {
      name: "Glency Retardo",
      position: "Procurement Officer",
      imageSrc: "https://i.imgur.com/jfhrmtb.png",
      socialLinks: {
        facebook: "https://www.facebook.com/glency.retardo",
        github: "https://github.com/glencyretardo",
        linkedin: "www.linkedin.com/in/glency-retardo-4481bb313",
      },
    },
  ]
};

export default department;
