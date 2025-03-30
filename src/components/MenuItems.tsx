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
import logo from "../../public/logo.png";
import { twMerge } from "tailwind-merge";

function MenuItemLink({
  name,
  link,
  active,
  className,
}: {
  name: string;
  link: string;
  active: string;
  className?: string;
}) {
  return (
    <Link
      href={link}
      key={name}
      className={twMerge(
        ` text-lg ${
          active === link ? "text-primary font-semibold" : "hover:text-primary"
        } ${className}`
      )}
    >
      {name}
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

  useEffect(() => {
    setActive("/" + pathname.split("/")[1]);
  }, [pathname]);

  return (
    <nav className="flex items-center font-montserrat">
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-4">
            <SheetTitle>
              <Image
                src={logo}
                alt="START Logo"
                height={40}
                className="mx-auto"
              />
            </SheetTitle>
            <SheetDescription></SheetDescription>
            <ul className="space-y-4 p-4 flex flex-col font-montserrat w-full">
              {menuItems.map(({ name, link }, index) => (
                <div
                  key={"sm" + name + index}
                  className="border-b last:border-b-0 border-gray-300 pb-2 w-full"
                >
                  <MenuItemLink
                    name={name}
                    link={link}
                    active={active}
                    className="w-full block text-center"
                  />
                </div>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </div>

      <ul className="hidden lg:flex space-x-6">
        {menuItems.map(({ name, link }, index) => (
          <MenuItemLink
            key={"lg" + name + index}
            name={name}
            link={link}
            active={active}
          />
        ))}
      </ul>
    </nav>
  );
}
