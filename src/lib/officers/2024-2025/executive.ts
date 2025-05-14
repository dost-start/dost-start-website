import { Department } from "@/types/officerType";

const department: Department = {
  name: "Executive Leadership",
  tabName: "Executive",
  description:
    "The Executive Leadership department is responsible for overseeing the strategic direction of the organization, guiding key decisions, and ensuring the alignment of all departments with the organization's goals.",
  specialOfficers: [],
  officers: [
    {
      name: "Kristoffe Bien Montelibano",
      position: "Chief Executive Officer",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747125579/b5Pzi0w_cqh6ji.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/kristoffebien.montelibano.3/",
        linkedin:
          "https://www.linkedin.com/in/kristoffe-montelibano-1a66ba2aa/",
      },
    },
    {
      name: "Winmark Chan",
      position: "Chief Operations Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {},
    },
    {
      name: "Harold James D. Cruz",
      position: "Chief Technology Officer",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747125612/1Z59Phl_djasyh.png",
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/harome/",
      },
    },
    {
      name: "Mark Gelson Panganoron",
      position: "Chief Finance Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/markgelson.panganoron.1",
      },
    },
    {
      name: "Andrei Rouiz Pascual",
      position: "Chief Communications Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/pscl.ndr",
      },
    },
    {
      name: "Mc Genrev P. Egar",
      position: "Chief Community Development Officer",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747228045/EGAR_MC_GENREV_CCDO_a1s4li.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/profile.php?id=100006891945256",
        linkedin: "https://www.linkedin.com/in/mcgenrevegar/",
      },
    },
    {
      name: "Jesscor P. Fulay",
      position: "Chief Events Officer",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747125639/NmOFL6j_dngx3d.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/jesscor.palmafulay",
      },
    },
  ],
};

export default department;
