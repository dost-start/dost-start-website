import { Department } from "@/types/officerType";

const department: Department = {
  name: "Marketing Department",
  tabName: "Marketing",
  description:
    "The Marketing Department is responsible for developing and executing marketing strategies, creating promotional content, and managing social media platforms to promote the organization's brand.",
  specialOfficers: [
    {
      name: "Erica Cago",
      position: "Chief Marketing Officer",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747126384/UavbTEO_qhhlbr.png",
      socialLinks: {
        facebook: "https://www.facebook.com/erica.ito.cago/",
        linkedin: "www.linkedin.com/in/erica-cago",
        instagram: "https://www.instagram.com/ecaanngg_/",
        behance: "https://www.behance.net/ericacago1",
      },
    },
    {
      name: "Dynise Manuelle R. Lira",
      position: "Deputy Chief Marketing Officer",
      imageSrc: "/profile-placeholder.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/dynise.lira",
        github: "https://github.com/theniecelira",
        linkedin: "https://www.linkedin.com/in/dynise-lira-561997270/",
        instagram: "https://www.instagram.com/theniece_lira/",
      },
    },
  ],
  officers: [
    {
      name: "Vhanna Marie Francesca Elnas",
      position: "Promotions Lead",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747126405/hs4LRxX_iwpd7o.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/vhannaelnass",
        linkedin: "https://www.linkedin.com/in/vhanna-elnas-0b938626b/",
        instagram: "https://www.instagram.com/nklsvs?igsh=MTYybmd1Z3R0ZjRxNg==",
      },
    },
    {
      name: "Sushane C. Vendiola",
      position: "Creative Leads",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747126426/KXHP4Jf_awv5a5.png",
      socialLinks: {
        facebook: "https://www.facebook.com/SushiNiV/",
        github: "https://github.com/SushiNiV",
        linkedin: "https://www.linkedin.com/in/sushane-vendiola-025snv/",
        instagram: "https://www.instagram.com/sushiniv/",
        youtube: "https://www.youtube.com/@SushiNiV",
        twitter: "https://x.com/SushiNiV",
      },
    },
    {
      name: "Juwairiyah S. Marohombsar",
      position: "Graphic Artist",
      imageSrc:
        "https://res.cloudinary.com/dsz9ok0yq/image/upload/v1747126445/NZoZuCm_wfun4v.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/share/15BWQGEXqd/?mibextid=wwXIfr",
        linkedin:
          "https://www.linkedin.com/in/juwairiyah-marohombsar-54542435a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        instagram:
          "https://www.instagram.com/iyeah_sm?igsh=MWl2YnNlcXZpaXY2aA%3D%3D&utm_source=qr",
      },
    },
  ],
};

export default department;
