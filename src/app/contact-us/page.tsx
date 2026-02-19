import MaxLayout from "@/components/MaxLayout";
import ContactUsPageClient from "@/app/contact-us/ContactUsPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - DOST START",
  description: "Get in touch with START for inquiries, feedback, or collaboration. We are eager to hear from you and look forward to building connections that foster innovation, leadership, and growth within the Filipino tech community.",
  keywords: [
    "DOST START contact",
    "contact DOST",
    "START inquiries",
    "collaboration",
    "Filipino tech community",
    "DOST-SEI contact"
  ],
  openGraph: {
    title: "Contact DOST START",
    description: "Get in touch with START for inquiries, feedback, or collaboration. We are eager to hear from you and look forward to building connections that foster innovation, leadership, and growth within the Filipino tech community.",
    url: `${process.env.WEBSITE_DOMAIN_URL}/contact-us`,
    siteName: "DOST START",
    images: [
      {
        url: `${process.env.WEBSITE_DOMAIN_URL}/contact-image.png`,
        width: 1287,
        height: 574,
        alt: "DOST START Contact Us",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact DOST START",
    description: "Get in touch with START for inquiries, feedback, or collaboration opportunities in the Filipino tech community.",
    images: [`${process.env.WEBSITE_DOMAIN_URL}/contact-image.png`],
  },
  alternates: {
    canonical: `${process.env.WEBSITE_DOMAIN_URL}/contact-us`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function page() {
  return (
    <MaxLayout>
      <ContactUsPageClient />
    </MaxLayout>
  );
}
