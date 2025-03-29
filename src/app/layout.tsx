import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import "./globals.css";
import { montserrat, orbitron, roboto, robotoMono } from "@/lib/fonts";

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
        className={`${roboto.variable} ${robotoMono.variable} ${montserrat.variable} ${orbitron.variable} font-sans antialiased max-w-[1920px] mx-auto flex flex-col min-h-screen`}
      >
        <Navbar />
        <div className="max-w-[1920px] mx-auto">{children}</div>
        <Footer className="mt-auto" />
      </body>
    </html>
  );
}
