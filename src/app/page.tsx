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
import logo_s from "../../public/logo-s.png";
import officerImage from "../../public/officers.png";
import CurrentEventsSection from "@/components/events/CurrentEventsSection";

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

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full px-4">
        <div className="relative m-auto w-full h-[40vh] md:h-[55vh] rounded-b-3xl md:rounded-b-[5rem] mx-auto">
          <Image
            src={contactImage}
            alt="DOST START group photo"
            fill
            className="object-cover object-bottom rounded-b-3xl md:rounded-b-[5rem] absolute"
            priority
            sizes="100vw"
            placeholder="blur"
            quality={100}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 md:h-36 bg-gradient-to-t from-blue-500 to-transparent opacity-90 rounded-b-3xl md:rounded-b-[5rem]"></div>

          <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-white rounded-full flex items-start justify-center overflow-hidden z-10">
            <div className="relative w-3/5 h-3/5 mt-4">
              <Image
                src={logo_s}
                alt="START Logo"
                fill
                className="object-contain"
                placeholder="blur"
              />
            </div>
          </div>
        </div>

        <div className="relative text-center mt-12 md:mt-16 px-4 z-20">
          <h1 className="text-3xl md:text-5xl font-orbitron mb-2">
            <span className="text-sky-500">United,</span>{" "}
            <span className="text-gray-600">We Innovate</span>
          </h1>
          <p className="text-sky-500 md:text-lg">
            Scholars Transforming Advancement and Research for Technology
          </p>
        </div>

        <div className="relative z-20 w-full max-w-5xl mx-auto flex justify-center items-center gap-1 md:gap-2 my-12">
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[2%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[28%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[36%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[12%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[2%]"></div>
        </div>

        <div className="flex justify-center mt-6 mb-8 md:mb-12">
          <Link href="/about">
            <Button size={"xl"} className="text-lg">
              About START →
            </Button>
          </Link>
        </div>
      </section>

      <MaxLayout>
        <section className="pt-6 md:pt-12 w-full relative mb-24">
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
          <CurrentEventsSection />
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
