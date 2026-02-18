import Image from "next/image";
import { twMerge } from "tailwind-merge";
import logo from "../../public/logo-s.png";
import socialLinks from "./SocialLinks";

export default function Footer({ className }: { className?: string }) {
  const linkIcons = socialLinks.filter((s) => !s.link.startsWith("mailto:"));
  const emailLink = socialLinks.find((s) => s.link.startsWith("mailto:"));

  return (
    <footer
      className={twMerge(
        "font-montserrat border-t border-border/60 bg-background",
        className
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:px-6 sm:py-10">
        {/* Left: Logo + text */}
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left">
          <Image
            src={logo}
            alt="START Logo"
            width={48}
            height={48}
            className="shrink-0 object-contain"
          />
          <div>
            <p className="font-semibold text-foreground text-sm sm:text-base">
              Scholars Transforming Advancement and Research for Technology
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                © {new Date().getFullYear()} DOST START · All rights reserved
            </p>
          </div>
        </div>

        {/* Right: Social icons + email */}
        <div className="flex flex-col items-center sm:items-end">
          <div className="flex items-center gap-6">
            {linkIcons.map(({ icon: Icon, link }) => (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={link}
              >
                <Icon size={20} className="size-5" />
              </a>
            ))}
          </div>
          {emailLink && (
            <a
              href={emailLink.link}
              className="mt-3 text-center text-sm text-muted-foreground transition-colors hover:text-foreground sm:text-right"
            >
              {emailLink.text}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
