"use client";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import GlassSurface from "./GlassSurface";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import logoSOutline from "../../public/logo-s-outline.png";

function MenuItemLink({
  name,
  link,
  active,
  className,
  onClick,
  light,
}: {
  name: string;
  link: string;
  active: string;
  className?: string;
  onClick?: () => void;
  light?: boolean;
}) {
  const isActive = active === link;
  const textClass = light
    ? (isActive ? "text-primary font-semibold" : "text-black/95 hover:text-black")
    : isActive ? "text-primary font-semibold" : "text-white/90 hover:text-white";
  return (
    <Link
      href={link}
      key={name}
      className={twMerge(
        `relative text-base md:text-lg transition-all duration-300 ${textClass}`,
        className
      )}
      onClick={onClick}
    >
      <span className="relative z-10">{name}</span>
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

export default function MenuItems({
  hideContactOnDesktop = false,
  variant = "dark",
  compactMobile = false,
}: {
  hideContactOnDesktop?: boolean;
  variant?: "dark" | "light";
  compactMobile?: boolean;
}) {
  const light = variant === "light";
  const [active, setActive] = useState("/");
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // Sheet open state

  useEffect(() => {
    setActive("/" + pathname.split("/")[1]);
  }, [pathname]);

  return (
    <nav className={twMerge("flex items-center justify-center font-montserrat", light && "text-black")}>
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className={twMerge(
                "relative flex shrink-0 cursor-pointer items-center justify-center outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary/30 active:scale-95",
                compactMobile
                  ? "h-10 w-10 text-foreground"
                  : "h-14 w-14 rounded-full overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] sm:h-10 sm:w-10"
              )}
              aria-label="Open menu"
            >
              {!compactMobile && (
                <GlassSurface
                  borderRadius={9999}
                  variant="light"
                  width="100%"
                  height="100%"
                  className="!absolute !inset-0 !rounded-full"
                />
              )}
              <Menu className={twMerge("relative z-10 text-foreground", compactMobile ? "h-6 w-6" : "h-6 w-6 sm:h-5 sm:w-5")} strokeWidth={2} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="flex w-[min(85vw,320px)] max-w-[320px] flex-col border-l border-white/20 bg-white/70 p-0 shadow-[0_4px_30px_rgba(0,0,0,0.08)] backdrop-blur-2xl"
          >
            {/* Header with logo - glass style */}
            <div className="flex items-center gap-3 px-5 py-4 pr-14">
              <div className="flex h-14 w-14 shrink-0 overflow-hidden rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]">
                <GlassSurface borderRadius={9999} variant="light" width="100%" height="100%" className="!rounded-full size-full">
                  <div className="flex size-full items-center justify-center p-2">
                    <Image src={logoSOutline} alt="START" width={36} height={36} className="h-9 w-9 object-contain opacity-90" />
                  </div>
                </GlassSurface>
              </div>
              <SheetTitle className="font-orbitron text-base font-semibold text-foreground">
                DOST START
              </SheetTitle>
            </div>

            {/* Nav links - minimal */}
            <nav className="flex-1 overflow-y-auto px-4 py-2">
              <ul className="space-y-0.5">
                {menuItems
                  .filter(({ link }) => link !== "/contact-us")
                  .map(({ name, link }) => {
                    const isActive = active === link;
                    return (
                      <li key={link}>
                        <Link
                          href={link}
                          onClick={() => setOpen(false)}
                          className={twMerge(
                            "block rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-white/60 text-primary"
                              : "text-foreground/80 hover:bg-white/40 hover:text-foreground"
                          )}
                        >
                          {name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </nav>

            {/* Contact us - glass pill matching navbar */}
            <div className="p-4">
              <Link
                href="/contact-us"
                onClick={() => setOpen(false)}
                className="flex h-11 w-full overflow-hidden rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] transition-opacity hover:opacity-95 active:scale-[0.98]"
              >
                <GlassSurface borderRadius={9999} variant="light" width="100%" height="100%" className="!rounded-full relative size-full">
                  <div className="absolute inset-0 z-0 rounded-full bg-primary/85" />
                  <span className="relative z-10 flex size-full items-center justify-center text-sm font-semibold text-primary-foreground">
                    Contact us
                  </span>
                </GlassSurface>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <ul className="hidden lg:flex items-center justify-center space-x-4 md:space-x-8">
        {menuItems
          .filter(({ link }) => !(hideContactOnDesktop && link === "/contact-us"))
          .map(({ name, link }, index) => (
          <li key={"lg" + name + index} className="relative">
            <MenuItemLink
              name={name}
              link={link}
              active={active}
              light={light}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
