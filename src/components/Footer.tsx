import { FacebookIcon, InstagramIcon, Mail } from "lucide-react";
import Image from "next/image";
import logo from "../../public/logo-s.png";
import { twMerge } from "tailwind-merge";

export default function Footer({ className }: { className?: string }) {
  const contactUsLinks = [
    {
      icon: FacebookIcon,
      text: "Facebook",
    },
    {
      icon: InstagramIcon,
      text: "Instagram",
    },
    {
      icon: Mail,
      text: "Email",
    },
  ];

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
        `border-t bg-muted font-montserrat py-8 px-6 ${className}`
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
          <h2 className="font-orbitron text-primary text-lg mb-4">
            Contact Us
          </h2>
          <ul className="space-y-3">
            {contactUsLinks.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-3 "
              >
                <Icon size={20} />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-orbitron text-primary text-lg mb-4">
            Quick Links
          </h2>
          <ul className="space-y-2">
            {quickLinks.map(({ text, link }) => (
              <li key={text}>
                <a href={link} className="hover:text-primary cursor-pointer">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
