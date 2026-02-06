"use client";
import Image from "next/image";
import MenuItems from "./MenuItems";
import logo from "../../public/logo.png";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky z-50 transition-all duration-300 ${
      isScrolled ? "top-4 mx-4 md:mx-8" : "top-0 mx-0"
    }`}>
      <div className={`backdrop-blur-2xl bg-background/80 border shadow-2xl transition-all duration-300 relative ${
        isScrolled 
          ? "border-primary/30 rounded-2xl shadow-primary/10" 
          : "border-b border-primary/40 rounded-none shadow-none"
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl pointer-events-none"></div>
        <div className="max-w-[1720px] px-4 md:px-8 py-3 md:py-4 flex items-center justify-between mx-auto relative z-10">
          <Link href={"/"} className="group relative">
            <div className="absolute inset-0 bg-gray-200/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative transform transition-transform duration-300 group-hover:scale-105">
              <Image src={logo} alt="Start Logo" height={50} className="drop-shadow-lg" />
            </div>
          </Link>
          <MenuItems />
        </div>
      </div>
    </div>
  );
}
