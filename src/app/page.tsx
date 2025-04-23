import Image from "next/image"
import Link from "next/link"
import UpcomingEventsSection from "@/components/events/UpcomingEventsSection"
import SocialLinks from "@/components/SocialLinks"
import StartDiv from "@/components/StartDiv"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full">
        <div className="relative m-auto w-[90vw] h-[50vh] md:h-[60vh] rounded-b-3xl md:rounded-b-[5rem]">
          <Image
            src="/contact-image.png"
            alt="DOST START group photo"
            fill
            className="object-cover rounded-b-3xl md:rounded-b-[5rem]"
            priority
            sizes="100vw"
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 md:h-36 bg-gradient-to-t from-blue-500 to-transparent opacity-90 rounded-b-3xl md:rounded-b-[5rem]"></div>

          <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-white rounded-full flex items-start justify-center overflow-hidden z-10">
            <div className="relative w-3/5 h-3/5 mt-4">
              <Image src="/logo-s.png" alt="START Logo" fill className="object-contain" />
            </div>
          </div>
        </div>

        <div className="relative text-center mt-12 md:mt-16 px-4 z-20">
          <h1 className="text-3xl md:text-5xl font-orbitron mb-2">
            <span className="text-sky-500">United,</span> <span className="text-gray-600">We Innovate</span>
          </h1>
          <p className="text-sky-500 md:text-lg">Scholars Transforming Advancement and Research for Technology</p>
        </div>

        <div className="relative z-20 w-full max-w-5xl mx-auto flex justify-center items-center gap-1 md:gap-2 mt-6 md:mt-8 mb-4">
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[2%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[28%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[36%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[12%]"></div>
          <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[2%]"></div>
        </div>

        <div className="flex justify-center mt-6 mb-8 md:mb-12">
          <Link href="/about">
            <Button>About START →</Button>
          </Link>
        </div>
      </section>

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
              ></div> {/* large screen bug, not going full width */}
              <div className="flex flex-col md:flex-row p-4 md:p-8 z-10 relative">
                <div className="md:w-1/2 flex flex-col justify-center md:pr-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 font-orbitron">Events</h2>
                  <p className="text-justify mb-6 md:mb-8 text-sm md:text-base">
                    Lorem ipsum dolor sit amet consectetur. Tortor ultrices tristique id at donec id. Molestie est neque
                    ac pharetra diam pulvinar augue. Elementum lectus nibh at lacus. Risus enim vivamus sagittis morbi
                    suscipit. Elit gravida tellus blandit magna mauris cras nunc in. Venenatis ornare gravida eu at
                    dolor a nunc.
                  </p>
                  <div>
                    <Link href="/events">
                      <Button>Events →</Button>
                    </Link>
                  </div>
                </div>

                <div className="md:w-1/2 mt-6 md:mt-0">
                  <div className="grid grid-cols-2 gap-2 md:gap-4">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src="/home-events-image1.png"
                        alt="Event 1"
                        fill
                        className="object-cover rounded-lg border-4 border-black"
                      />
                    </div>
                    <div className="relative aspect-[4/3]">
                      <Image
                        src="/home-events-image2.png"
                        alt="Event 2"
                        fill
                        className="object-cover rounded-lg border-4 border-black"
                      />
                    </div>
                    <div className="relative aspect-[16/9] col-span-2 mt-2">
                      <Image
                        src="/home-events-image3.png"
                        alt="Event 3"
                        fill
                        className="object-cover rounded-lg border-4 border-black"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <UpcomingEventsSection />

      <div className="w-full max-w-5xl mx-auto flex justify-center items-center gap-1 md:gap-2 mt-6 md:mt-8 mb-4">
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[2%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[28%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[36%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[12%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[2%]"></div>
      </div>

      <section className="py-8 md:py-12 px-4 w-full max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="md:w-3/5 relative overflow-hidden rounded-lg order-1 md:order-1 h-full">
            <div className="relative w-full" style={{ height: "120%" }}>
              <Image
                src="/home-officers-image.png"
                alt="Officers"
                className="object-cover"
                fill
                sizes="(max-width: 768px) 60vw, 40vw"
              />
            </div>
          </div>
                {/* adjusting right now for mobile */}
          <StartDiv className="start-dropshadow bg-accent rounded-lg p-6 md:p-8 w-full md:w-2/5 order-2 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 font-orbitron">Officers</h2>
            <p className="text-justify mb-6 md:mb-8 text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur. Tortor ultrices tristique id at donec id. Molestie est neque ac
              pharetra diam pulvinar augue. Elementum lectus nibh at lacus. Risus enim vivamus sagittis morbi suscipit.
              Elit gravida tellus blandit magna mauris cras nunc in.
            </p>
            <div>
              <Link href="/officers" className=" font-medium">
                <Button className="my-6">
                  Officers →
                </Button>
              </Link>
            </div>
          </StartDiv>
        </div>
      </section>

      <div className="w-full max-w-5xl mx-auto flex justify-center items-center gap-1 md:gap-2 mt-6 md:mt-8 mb-4">
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[2%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[28%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[36%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[12%]"></div>
        <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border border-black w-[2%]"></div>
      </div>

      <section className="px-4">
        <StartDiv className="start-dropshadow border-4 bg-primary w-full max-w-5xl mx-auto justify-center grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 my-4 text-white py-8 md:py-12 px-4 md:px-8">
          <div className="md:col-span-2">
            <h2 className="font-orbitron text-3xl mb-8">Contact Us</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo illo architecto tenetur hic placeat eos
              praesentium dolorum quam, similique quia maxime harum quaerat? Atque doloremque quod amet, asperiores
              quidem est. Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo illo architecto tenetur hic
              placeat eos praesentium dolorum quam, similique quia maxime harum quaerat? Atque doloremque quod amet,
              asperiores quidem est.
            </p>
            <Link href="/contact-us">
              <Button className="my-6" variant={"accent"} >
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

      <div className="w-full max-w-5xl mx-auto flex justify-center items-center gap-1 md:gap-2 my-6 md:my-8">
  <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 md:border-3 border-black w-[7%]"></div>
  <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 md:border-3 border-black w-[1%]"></div>
  <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 md:border-3 border-black w-[20%]"></div>
  <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 md:border-3 border-black w-[7%]"></div>
  <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 md:border-3 border-black w-[1%]"></div>
  <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 md:border-3 border-black w-[20%]"></div>
  <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 md:border-3 border-black w-[7%]"></div>
  <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 md:border-3 border-black w-[1%]"></div>
  <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 md:border-3 border-black w-[20%]"></div>
  <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 md:border-3 border-black w-[7%]"></div>
  <div className="h-1.5 md:h-2 bg-yellow-400 rounded-full border-2 md:border-3 border-black w-[1%]"></div>
</div>

    </div>
  )
}
