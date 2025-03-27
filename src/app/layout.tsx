import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "START",
  description: "START (Scholars Transforming Advancement and Research for Technology) is a national organization of DOST-SEI scholars dedicated to bridging the technological gap in the Philippines through collaboration, innovation, and mentorship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[1920px] mx-auto`}
      >
        <Navbar />
        <div className="max-w-[1920px] mx-auto">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
