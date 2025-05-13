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
import { getPlaiceholder } from "plaiceholder";

export async function getImageBlur(src: string) {
  if (!src.startsWith("https")) {
    return "";
  }
  const transformedSrc = src.replace("/upload/", "/upload/w_10,q_10/");

  const response = await fetch(transformedSrc);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { base64 } = await getPlaiceholder(buffer);
  return base64;
}

export default async function OfficerCard({ officer }: { officer: Officer }) {
  const blurUrl = await getImageBlur(officer.imageSrc);
  return (
    <div className="text-center">
      <Image
        src={officer.imageSrc}
        alt={officer.name}
        className="w-45 h-45 rounded-full mx-auto object-cover object-top border"
        width={200}
        height={200}
        placeholder={officer.imageSrc.startsWith("https") ? "blur" : undefined}
        blurDataURL={blurUrl}
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
