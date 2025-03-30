import { Officer } from "@/types/officerType";
import Image from "next/image";
import { createElement } from "react";
import {
  FaBehance,
  FaFacebook,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const socialIcons = {
  facebook: FaFacebook, // Should be FaFacebook if you're using Facebook
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  github: FaGithub,
  website: FaGlobe,
  behance: FaBehance,
  youtube: FaYoutube,
  twitter: FaTwitter,
};

export default function OfficerCard({ officer }: { officer: Officer }) {
  return (
    <div className="text-center">
      <Image
        src={officer.imageSrc}
        alt={officer.name}
        className="w-45 h-45 rounded-full mx-auto"
        width={128}
        height={128}
      />
      <h3 className="text-lg font-semibold mt-4">{officer.name}</h3>
      <p className="text-sm text-gray-500">{officer.position}</p>
      <div className="flex justify-center gap-3 mt-2">
        {Object.entries(officer.socialLinks).map(([key, link]) =>
          link ? (
            <a
              key={key}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:primary transition-colors"
            >
              {socialIcons[key as keyof typeof socialIcons] &&
                createElement(socialIcons[key as keyof typeof socialIcons], {
                  size: 24,
                })}
            </a>
          ) : null
        )}
      </div>
    </div>
  );
}
