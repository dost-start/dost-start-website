import { Officer } from "@/types/officerType";
import Image from "next/image";
import { createElement } from "react";
import {
  FaBehanceSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";

const socialIcons = {
  facebook: FaFacebookSquare,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  github: FaGithubSquare,
  website: FaGlobe,
  behance: FaBehanceSquare,
  youtube: FaYoutubeSquare,
  twitter: FaTwitterSquare,
};

export default function OfficerCard({ officer }: { officer: Officer }) {
  return (
    <div className="text-center">
      <Image
        src={officer.imageSrc}
        alt={officer.name}
        className="w-45 h-45 rounded-full mx-auto object-cover object-top border"
        width={200}
        height={200}
        loading="lazy"
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
