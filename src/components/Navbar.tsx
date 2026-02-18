"use client";

import Image from "next/image";
import MenuItems from "./MenuItems";
import logoSOutline from "../../public/logo-s-outline.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GlassSurface from "./GlassSurface";

export default function Navbar() {
  const pathname = usePathname();
  const isContactActive = pathname === "/contact-us";
  const glassProps = { borderRadius: 9999, variant: "light" as const };

  return (
    <div className="sticky top-2 z-50 flex h-14 w-full items-center justify-center px-3 transition-all duration-300 sm:top-4 sm:h-16 sm:px-4">
      <div className="relative flex w-full max-w-[1000px] items-center justify-center gap-3">
        {/* Mobile: single pill - logo leftmost, hamburger rightmost */}
        <div className="relative flex h-14 w-full items-center justify-between overflow-hidden rounded-full px-4 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] sm:hidden">
          <GlassSurface
            {...glassProps}
            width="100%"
            height="100%"
            className="!absolute !inset-0 !rounded-full"
          />
          <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
            <Image
              src={logoSOutline}
              alt="START logo"
              width={40}
              height={40}
              className="h-9 w-9 object-contain opacity-90"
              placeholder="blur"
            />
          </div>
          <div className="relative z-10 ml-auto flex items-center justify-center">
            <MenuItems hideContactOnDesktop variant="light" compactMobile />
          </div>
        </div>

        {/* Desktop: logo island */}
        <div className="hidden h-12 w-12 shrink-0 overflow-hidden rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] sm:block">
          <GlassSurface
            {...glassProps}
            width="100%"
            height="100%"
            className="!rounded-full w-full h-full"
          >
            <div className="relative w-full h-full flex items-center justify-center p-1">
              <Image
                src={logoSOutline}
                alt="START logo"
                width={40}
                height={40}
                className="h-9 w-9 object-contain opacity-90 transition-opacity duration-200"
                placeholder="blur"
              />
            </div>
          </GlassSurface>
        </div>

        {/* Desktop: middle nav pill */}
        <div className="relative hidden h-12 min-w-0 max-w-[720px] flex-1 overflow-hidden rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] sm:flex">
          <GlassSurface
            {...glassProps}
            width="100%"
            height="100%"
            className="!absolute !inset-0 !rounded-full"
          />
          <div className="relative z-10 flex w-full items-center justify-center px-6 py-3 md:px-10">
            <MenuItems hideContactOnDesktop variant="light" />
          </div>
        </div>

        {/* Contact island */}
        <Link
          href="/contact-us"
          className="hidden lg:block h-12 w-[140px] shrink-0 overflow-hidden rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.05)] transition-opacity hover:opacity-95"
          aria-current={isContactActive ? "page" : undefined}
        >
          <GlassSurface
            {...glassProps}
            width="100%"
            height="100%"
            className="!rounded-full w-full h-full relative"
          >
            <div className="absolute inset-0 z-0 bg-primary/85 rounded-full" />
            <span
              className={
                "relative z-10 flex h-full w-full items-center justify-center text-sm md:text-base font-montserrat transition-colors duration-300 " +
                (isContactActive ? "text-white font-semibold" : "text-white/95")
              }
            >
              Contact us
            </span>
          </GlassSurface>
        </Link>
      </div>
    </div>
  );
}
