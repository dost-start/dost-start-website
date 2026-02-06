"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import logo from "../../public/logo.png";

function MenuItemLink({
  name,
  link,
  active,
  className,
  onClick,
}: {
  name: string;
  link: string;
  active: string;
  className?: string;
  onClick?: () => void;
}) {
  const isActive = active === link;
  return (
    <Link
      href={link}
      key={name}
      className={twMerge(
        `relative text-base md:text-lg font-medium transition-all duration-300 group ${
          isActive 
            ? "text-primary font-semibold" 
            : "text-foreground/80 hover:text-primary"
        } ${className}`
      )}
      onClick={onClick}
    >
      <span className="relative z-10">{name}</span>
      {/* Animated underline */}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
      {/* Glow effect on hover */}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary blur-sm opacity-50" />
      )}
    </Link>
  );
}

const menuItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Events", link: "/events" },
  { name: "Officers", link: "/officers" },
  { name: "Contact us", link: "/contact-us" },
];

export default function MenuItems() {
  const [active, setActive] = useState("/");
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // Sheet open state

  useEffect(() => {
    setActive("/" + pathname.split("/")[1]);
  }, [pathname]);

  return (
    <nav className="flex items-center font-montserrat">
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="relative group hover:bg-primary/10 transition-all duration-300"
            >
              <Menu className="h-6 w-6 group-hover:text-primary transition-colors duration-300" />
              <span className="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="p-4 backdrop-blur-xl bg-background/95 border-l border-primary/20"
          >
            <SheetTitle>
              <Image
                src={logo}
                alt="START Logo"
                height={40}
                className="mx-auto drop-shadow-lg"
              />
            </SheetTitle>
            <SheetDescription></SheetDescription>
            <ul className="space-y-2 p-4 flex flex-col font-montserrat w-full mt-6">
              {menuItems.map(({ name, link }, index) => (
                <div
                  key={"sm" + name + index}
                  className="relative group border-b last:border-b-0 border-primary/10 pb-3 w-full hover:border-primary/30 transition-colors duration-300"
                >
                  <MenuItemLink
                    name={name}
                    link={link}
                    active={active}
                    className="w-full block py-2 px-4 rounded-lg hover:bg-primary/5 transition-all duration-300"
                    onClick={() => setOpen(false)}
                  />
                </div>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>

      <ul className="hidden lg:flex items-center space-x-1 md:space-x-6">
        {menuItems.map(({ name, link }, index) => (
          <li key={"lg" + name + index} className="relative">
            <MenuItemLink
              name={name}
              link={link}
              active={active}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
