"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function MenuItemLink({
  name,
  link,
  active,
}: {
  name: string;
  link: string;
  active: string;
}) {
  return (
    <Link
      href={link}
      key={name}
      className={`text-lg  ${
        active === link ? "text-primary font-bold" : "hover:text-primary"
      }`}
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
    setActive(pathname);
  }, [pathname]);

  return (
    <nav className="flex items-center">
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <ul className="space-y-4 p-4">
              {menuItems.map(({ name, link }, index) => (
                <MenuItemLink
                  key={"sm" + name + index}
                  name={name}
                  link={link}
                  active={active}
                />
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
