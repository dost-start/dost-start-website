import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import logo from "../../public/logo-s.png";
import socialLinks from "./SocialLinks";

export default function Footer({ className }: { className?: string }) {

  const quickLinks = [
    {
      text: "About",
      link: "/about",
    },
    {
      text: "Events",
      link: "/events",
    },
    {
      text: "Officers",
      link: "/officers",
    },
    {
      text: "Contact Page",
      link: "/contact-us",
    },
  ];

  return (
    <div
      className={twMerge(
        `bg-muted font-montserrat py-6 px-6 ${className}`
      )}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div className="flex flex-col">
          <Image src={logo} alt="START Logo" width={80} height={80} />
          <p className="mt-4 text-sm max-w-xs">
            Scholars Transforming Advancement and Research for Technology
          </p>
        </div>

        <div>
          <h2 className="font-orbitron text-primary text-2xl mb-4">
            Contact Us
          </h2>
          <ul className="space-y-3">
            {socialLinks.map(({ icon: Icon, text, link }) => (
              <li
                key={text}
                className="flex items-center gap-3 hover:text-primary cursor-pointer w-fit"
              >
                <Icon size={20} />
                <a href={link} target="_blank" >{text}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-orbitron text-primary text-2xl mb-4">
            Quick Links
          </h2>
          <ul className="space-y-2">
            {quickLinks.map(({ text, link }) => (
              <li key={text}>
                <Link href={link} className="hover:text-primary cursor-pointer">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>Copyright © {new Date().getFullYear()} DOST START | All Rights Reserved</p>
      </div>
    </div>
  );
}
