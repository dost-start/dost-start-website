import { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";

export const metadata: Metadata = {
  title: "About Us - DOST START",
  description: "START is a national organization of DOST-SEI scholars committed to bridging the technological gap across the Philippines. Representing all 17 regions, we unite scholars with diverse expertise to foster collaboration, innovation, and regional development.",
  keywords: [
    "DOST START about",
    "DOST-SEI scholars",
    "Philippines technology",
    "regional development",
    "scholar organization",
    "tech collaboration",
    "innovation network"
  ],
  openGraph: {
    title: "About DOST START",
    description: "START is a national organization of scholars of the Department of Science and Technology - Science Education Institute (DOST-SEI) committed to bridging the technological gap across the Philippines. Representing all 17 regions, the organization unites scholars with diverse expertise in various tech fields, aiming to foster collaboration, innovation, and regional development.",
    url: `${process.env.WEBSITE_DOMAIN_URL}/about`,
    siteName: "DOST START",
    images: [
      {
        url: `${process.env.WEBSITE_DOMAIN_URL}/contact-image.png`,
        width: 1287,
        height: 574,
        alt: "DOST START scholars",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About DOST START",
    description: "National organization of DOST-SEI scholars bridging the technological gap across the Philippines through collaboration and innovation.",
    images: [`${process.env.WEBSITE_DOMAIN_URL}/contact-image.png`],
  },
  alternates: {
    canonical: `${process.env.WEBSITE_DOMAIN_URL}/about`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutUs() {
  return (
  <div className="max-w-6xl mx-auto mt-10" >
    <AboutUsClient />
  </div>
  );
}
