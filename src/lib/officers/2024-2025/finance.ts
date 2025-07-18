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
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1751105559/gelson_cy52db.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/markgelson.panganoron.1",
      },
    },
    {
      name: "Al-abass D. Ibrahim",
      position: "Deputy Chief Finance Officer",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747126310/u42q3Zv_pm4lcv.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/abass.ibrahim.0713",
        github: "https://github.com/yuuwa13",
        linkedin:
          "https://www.linkedin.com/in/al-abass-ibrahim-a0865227a/?trk=opento_sprofile_details",
      },
    },
  ],
  officers: [
    {
      name: "Muttia Selgas",
      position: "Budget and Accounting Officer",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747126337/eQhvSDF_qihxcq.png",
      socialLinks: {
        facebook: "https://www.facebook.com/selgas.16",
        github: "https://github.com/MuttiaSelgas",
        linkedin: "https://www.linkedin.com/in/muttia-selgas-549350338/",
      },
    },
    {
      name: "Glency Retardo",
      position: "Procurement Officer",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747126359/jfhrmtb_oyjaci.png",
      socialLinks: {
        facebook: "https://www.facebook.com/glency.retardo",
        github: "https://github.com/glencyretardo",
        linkedin: "www.linkedin.com/in/glency-retardo-4481bb313",
      },
    },
  ],
};

export default department;
