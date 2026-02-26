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
import { BackgroundGradient } from "@/components/ui/background-gradient";

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
    <BackgroundGradient
      containerClassName="w-[220px] h-[320px] mx-auto"
      className="h-full"
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-card text-card-foreground shadow-md border border-border transition-transform duration-300 hover:-translate-y-1">
        {/* Content wrapper */}
        <div className="flex flex-1 flex-col items-center justify-between px-4 pt-5 pb-0 gap-1">
          {/* Name + role */}
          <header className="text-center space-y-0.5 shrink-0">
            <h3 className="text-base font-orbitron font-semibold text-foreground leading-snug">
              {officer.name}
            </h3>
            <p className="text-xs text-muted-foreground leading-snug">
              {officer.position}
            </p>
          </header>

          {/* Portrait */}
          <div className="relative flex-1 flex items-center justify-center w-full min-h-0">
            <div className="relative w-[120px] h-[120px] flex items-center justify-center shrink-0">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-muted/30">
                <Image
                  src={officer.imageSrc}
                  alt={officer.name}
                  className="object-cover object-top w-full h-full saturate-0 group-hover:saturate-100 transition duration-500 ease-out"
                  width={220}
                  height={280}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social links */}
        <footer className="flex flex-wrap items-center justify-center gap-2 px-3 pb-3 pt-2 min-h-[44px] border-t border-border bg-muted/50 shrink-0">
            {Object.entries(officer.socialLinks).map(([key, link]) =>
              link ? (
                <a
                  key={key}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-200 p-1.5"
                  aria-label={key}
                >
                  {socialIcons[key as keyof typeof socialIcons] &&
                    createElement(socialIcons[key as keyof typeof socialIcons], {
                      size: 14,
                    })}
                </a>
              ) : null,
            )}
        </footer>
      </article>
    </BackgroundGradient>
  );
}
