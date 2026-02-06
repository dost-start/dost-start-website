import MaxLayout from "@/components/MaxLayout";
import SocialLinks from "@/components/SocialLinks";
import StartDiv from "@/components/StartDiv";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import contactImage from "../../public/contact-image.png";
import homeEventsImage1 from "../../public/home-events-image1.png";
import homeEventsImage2 from "../../public/home-events-image2.png";
import homeEventsImage3 from "../../public/home-events-image3.png";
import logo_s from "../../public/logo-s-outline.png";
import officerImage from "../../public/officers.png";
import CurrentEventsSection from "@/components/events/CurrentEventsSection";
import { getCategorizedEventsData } from "@/lib/data";
import CardSwap from "@/components/home/CardSwap";
import ImageCard from "@/components/home/ImageCard";
import MobileImageCarousel from "@/components/home/MobileImageCarousel";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";

// Enable ISR with 1-hour revalidation for better performance
export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title:
    "DOST START - Scholars Transforming Advancement and Research for Technology",
  description:
    "United, We Innovate. DOST START brings together techno-scholars across the Philippines to drive innovation, collaboration, and technological advancement for sustainable regional development.",
  keywords: [
    "DOST",
    "START",
    "scholars",
    "technology",
    "innovation",
    "research",
    "Philippines",
    "DOST-SEI",
    "techno-scholars",
    "regional development",
    "collaboration",
  ],
  authors: [{ name: "DOST START" }],
  openGraph: {
    title: "DOST START - United, We Innovate",
    description:
      "Scholars Transforming Advancement and Research for Technology. Connecting techno-scholars across the Philippines for innovation and regional development.",
    url: process.env.WEBSITE_DOMAIN_URL,
    siteName: "DOST START",
    images: [
      {
        url: `${process.env.WEBSITE_DOMAIN_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "DOST START - United, We Innovate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOST START - United, We Innovate",
    description:
      "Scholars Transforming Advancement and Research for Technology. Connecting techno-scholars across the Philippines.",
    images: [`${process.env.WEBSITE_DOMAIN_URL}/og-image.png`],
  },
  alternates: {
    canonical: process.env.WEBSITE_DOMAIN_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default async function HomePage() {
  // Fetch events data (from Contentful or local fallback)
  const { currentEvents, upcomingEvents } = await getCategorizedEventsData();

  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full min-h-screen flex items-center justify-center pr-0 pt-0 pb-8 md:pb-20 bg-white overflow-visible md:overflow-hidden">
        <div className="absolute inset-0 [--color-neutral-300:oklch(0.85_0_0)] [--color-neutral-100:oklch(0.92_0_0)] [--color-neutral-500:oklch(0.75_0_0)]">
          <BackgroundRippleEffect rows={20} cols={35} cellSize={48} />
        </div>
        <div className="relative w-full max-w-[1720px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-4 md:gap-10 min-h-[80vh] z-10  md:pt-10">
          {/* Mobile */}
          <div className="w-full md:hidden -mt-5 -mb-35">
            <MobileImageCarousel
              images={[
                { src: contactImage, alt: "START Event" },
                { src: homeEventsImage2, alt: "START Event" },
                { src: homeEventsImage3, alt: "START Event" },
                { src: homeEventsImage1, alt: "START Event" },
              ]}
            />
          </div>

          {/* Left side - Text content */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full md:w-auto justify-center z-10 order-2 md:order-1">
            {/* Logo */}
            <div className="relative w-44 h-44 md:-ml-20 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center overflow-hidden shrink-0">
              <div className="relative w-3/5 h-3/5">
                <Image
                  src={logo_s}
                  alt="START Logo"
                  fill
                  className="object-contain"
                  placeholder="blur"
                />
              </div>
            </div>

            {/* Title and Subtitle */}
            <div className="mb-4 md:mb-6 -mt-4 md:-mt-6">
              <h1 className="text-3xl md:text-5xl font-orbitron mb-1.5">
                <span className="text-primary">United,</span>{" "}
                <span className="text-foreground">We Innovate</span>
              </h1>
              <p className="text-primary md:text-lg leading-relaxed">
                Scholars Transforming Advancement and Research for Technology
              </p>
            </div>

            {/* Yellow Dividers */}
            <div className="w-full max-w-md flex justify-center md:justify-start items-center gap-1 md:gap-2 my-4 md:my-5">
              <div className="h-1.5 md:h-2 bg-accent rounded-full border border-black w-[2%]"></div>
              <div className="h-1.5 md:h-2 bg-accent rounded-full border border-black w-[28%]"></div>
              <div className="h-1.5 md:h-2 bg-accent rounded-full border border-black w-[36%]"></div>
              <div className="h-1.5 md:h-2 bg-accent rounded-full border border-black w-[12%]"></div>
              <div className="h-1.5 md:h-2 bg-accent rounded-full border border-black w-[2%]"></div>
            </div>

            {/* Button */}
            <div className="mt-2 md:mt-4">
              <Link href="/about">
                <Button size={"xl"} className="text-lg">
                  About START →
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - CardSwap (Desktop only) */}
          <div className="flex-1 relative w-full md:w-auto flex justify-center md:justify-end items-start md:items-center md:min-h-[800px] md:h-[800px] md:mr-0 overflow-visible order-1 md:order-2">
            {/* Desktop */}
            <div className="relative w-full h-full md:w-[680px] md:h-[800px] hidden md:block overflow-visible">
              <CardSwap
                width={680}
                height={600}
                cardDistance={68}
                verticalDistance={85}
                delay={5000}
                pauseOnHover={false}
                skewAmount={6}
                easing="elastic"
                rightOffset="0"
                bottomOffset="0%"
              >
              {/* Card 1 */}
              <ImageCard>
                <Image
                  src={contactImage}
                  alt="START Event"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  placeholder="blur"
                />
              </ImageCard>
              
              {/* Card 2 */}
              <ImageCard>
                <Image
                  src={homeEventsImage2}
                  alt="START Event"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  placeholder="blur"
                />
              </ImageCard>
              
              {/* Card 3 */}
              <ImageCard>
                <Image
                  src={homeEventsImage3}
                  alt="START Event"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  placeholder="blur"
                />
              </ImageCard>
              
              {/* Card 4 */}
              <ImageCard>
                <Image
                  src={homeEventsImage1}
                  alt="START Event"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  placeholder="blur"
                />
              </ImageCard>
              </CardSwap>
            </div>
          </div>
        </div>
      </section>

      <MaxLayout>
        <section className="pt-40 md:pt-40 pb-16 w-full relative mb-24">
          <div className="w-full mx-auto relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[80%] h-[110%] md:h-[120%] border-4 border-yellow-400"></div>

            <div className="w-full mx-auto relative">
              <div className="bg-accent overflow-hidden w-full max-w-full lg:max-w-none">
                <div
                  className="w-full absolute inset-0 z-0"
                  style={{
                    backgroundImage: "url(/texture.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.2,
                  }}
                ></div>{" "}
                <div className="flex flex-col md:flex-row p-4 md:p-8 z-10 relative">
                  <div className="md:w-1/2 flex flex-col justify-center md:pr-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 font-orbitron">
                      Events
                    </h2>
                    <p className="text-justify mb-6 md:mb-8 text-sm md:text-base">
                      At START, we believe that meaningful collaboration begins
                      with shared experiences. Our events are designed to
                      connect scholars, ignite curiosity, and foster innovation
                      across all regions of the Philippines. From national
                      summits and research forums to regional workshops and
                      community engagements, each gathering is a step toward
                      transforming the future through technology and research.
                      Join us as we build a culture of leadership, learning, and
                      impact.
                    </p>
                    <div>
                      <Link href="/events">
                        <Button size={"xl"} className="text-lg">
                          Events →
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="md:w-1/2 mt-6 md:mt-0">
                    <div className="grid grid-cols-2 gap-2 md:gap-4">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={homeEventsImage1}
                          alt="Event 1"
                          fill
                          className="object-cover rounded-lg border-4 border-black"
                          placeholder="blur"
                        />
                      </div>
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={homeEventsImage2}
                          alt="Event 2"
                          fill
                          className="object-cover rounded-lg border-4 border-black"
                          placeholder="blur"
                        />
                      </div>
                      <div className="relative aspect-[16/9] col-span-2 mt-2">
                        <Image
                          src={homeEventsImage3}
                          alt="Event 3"
                          fill
                          className="object-cover rounded-lg border-4 border-black"
                          placeholder="blur"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="px-2">
          <CurrentEventsSection
            currentEvents={currentEvents}
            upcomingEvents={upcomingEvents}
          />
        </div>

        <div className="w-full max-w-7xl mx-auto flex justify-center items-center gap-1 md:gap-2 my-12">
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[2%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[28%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[36%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[12%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[2%]"></div>
        </div>

        <section className="max-w-7xl px-2 w-full mx-auto xl:py-10">
          <StartDiv className="start-dropshadow bg-accent rounded-lg p-6 md:p-8 w-full relative flex flex-col-reverse lg:flex-row items-center gap-6 md:gap-8">
            <div className="w-full xl:w-3/5 xl:absolute">
              <Image
                src={officerImage}
                alt="Officers"
                className="object-cover w-full h-full rounded-tl-4xl rounded-br-4xl shadow-2xl"
                placeholder="blur"
              />
            </div>

            <div className="lg:w-3/5 xl:w-1/3 ml-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 font-orbitron">
                Officers
              </h2>
              <p className="text-justify mb-6 md:mb-8 text-sm md:text-base">
                A group of enthusiastic and motivated DOST-SEI scholars
                committed to service and excellence are the driving force behind
                each START milestone. From department heads to the C-Suite, our
                officials uphold our dedication to regional empowerment,
                innovation, and inclusion. As the backbone of START, they are
                united by our objective and make sure that every activity is in
                line with our strategic vision and core values. Get to know the
                people driving the shift to a more intelligent and cohesive
                academic community.
              </p>
              <div>
                <Link href="/officers" className="font-medium">
                  <Button className="my-6 text-xl" size={"xl"}>
                    Officers →
                  </Button>
                </Link>
              </div>
            </div>
          </StartDiv>
        </section>

        <div className=" w-full max-w-7xl mx-auto flex justify-center items-center gap-1 md:gap-2 my-12">
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[2%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[28%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[36%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[12%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[2%]"></div>
        </div>

        <section className="px-2 max-w-7xl mx-auto">
          <StartDiv className="start-dropshadow border-4 bg-primary w-full mx-auto justify-center grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 my-4 text-white px-4 md:px-8">
            <div className="md:col-span-2">
              <h2 className="font-orbitron text-3xl mb-8">Contact Us</h2>
              <p>
                Have questions, suggestions, or opportunities to collaborate?
                We’d love to hear from you! Whether you&apos;re a fellow
                scholar, potential partner, or simply curious about what we do,
                START is always open to conversation. Reach out to us to learn
                more about our programs, partnerships, or how you can be part of
                this transformative journey.
              </p>
              <Link href="/contact-us">
                <Button className="my-6" variant={"accent"} size={"xl"}>
                  Send us message
                </Button>
              </Link>
            </div>
            <div className="md:col-span-1 text-left">
              <h2 className="text-2xl font-bold mb-4">Socials</h2>
              <ul className="space-y-2">
                {SocialLinks.map(({ icon: Icon, text, link }) => (
                  <li key={text}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:font-semibold"
                    >
                      <Icon size={20} />
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </StartDiv>
        </section>
      </MaxLayout>
      <div className="px-2 w-full max-w-7xl mx-auto flex justify-center items-center gap-1 md:gap-2 my-6 md:my-12">
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 border-black w-[7%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 border-black w-[1%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 border-black w-[20%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 border-black w-[7%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 border-black w-[1%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 border-black w-[20%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 border-black w-[7%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 border-black w-[1%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 border-black w-[20%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 border-black w-[7%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 border-black w-[1%]"></div>
      </div>
    </div>
  );
}
