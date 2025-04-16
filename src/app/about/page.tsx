import PageTitle from "@/components/PageTitle"
import StartDiv from "@/components/StartDiv"
import Image from "next/image"

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <PageTitle text="About Us" />

      <section className="mb-12 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div className="md:col-span-2 order-2 md:order-1">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src="/contact-image.png"
                alt="DOST START group photo"
                fill
                className="object-cover rounded-bl-[3rem] rounded-tr-[3rem] shadow-[0rem_0rem_1rem_rgba(0,0,0,0.8)]"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
            </div>
          </div>
          <div className="hidden md:flex md:col-span-1 items-center justify-center order-1 md:order-2">
            <div className="relative w-full aspect-[4/5]">
              <Image
                src="/about-us-image1.png"
                alt="DOST START design"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12 relative">
        <div className="absolute left-0 top-0 bottom-0 w-4">
          <div className="absolute top-0 w-4 h-110 bg-blue-500 border-2 border-black rounded-full"></div>
          <div className="absolute top-114 w-4 h-4 bg-blue-500 border-2 border-black rounded-full"></div>
          <div className="absolute top-122 w-4 h-34 bg-blue-500 border-2 border-black rounded-full"></div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-4">
          <div className="absolute bottom-122 w-4 h-34 bg-blue-500 border-2 border-black rounded-full"></div>
          <div className="absolute bottom-114 w-4 h-4 bg-blue-500 border-2 border-black rounded-full"></div>
          <div className="absolute bottom-0 w-4 h-110 bg-blue-500 border-2 border-black rounded-full"></div>
        </div>

        <div className="px-8 mx-6">
          <div className="flex flex-col mb-8">
            <h1 className="text-3xl mb-6 font-orbitron text-primary text-left">WHAT IS START?</h1>
            <div className="space-y-4">
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur. Tortor ultrices tristique id at donec id. Molestie est neque ac
                pharetra diam pulvinar augue. Elementum lectus nibh at lacus. Risus enim vivamus sagittis morbi
                suscipit. Elit gravida tellus blandit magna mauris cras nunc in. Venenatis ornare gravida eu at dolor a
                nunc. Lorem ipsum dolor sit amet consectetur. Tortor ultrices tristique id at donec id. Molestie est
                neque ac pharetra diam pulvinar augue. Elementum lectus nibh at lacus. Risus enim vivamus sagittis morbi
                suscipit. Elit gravida tellus blandit magna mauris cras nunc in.
              </p>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec
                sit amet turpis libero. Nam facilisis interdum lorem, eget iaculis risus dapibus sit amet. Nulla
                facilisi. Curabitur scelerisque nulla ut euismod tincidunt. Lorem ipsum dolor sit amet consectetur
                adipiscing elit. Nulla vitae elit libero, a pharetra augue. Donec sit amet turpis libero. Nam facilisis
                interdum lorem, eget iaculis risus dapibus sit amet. Nulla facilisi. Curabitur scelerisque nulla ut
                euismod tincidunt.
              </p>
              <p className="text-justify">
                Aenean et leo orci. Donec luctus, nulla at venenatis pretium, erat lorem iaculis lorem, eget rhoncus
                turpis dui non ante. Etiam eu erat at nulla eleifend ullamcorper ac non nunc. Integer tincidunt vehicula
                quam eu convallis. Aenean et leo orci. Donec luctus, nulla at venenatis pretium, erat lorem iaculis
                lorem, eget rhoncus turpis dui non ante. Etiam eu erat at nulla eleifend ullamcorper ac non nunc.
                Integer tincidunt vehicula quam eu convallis.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 mb-10">
            <StartDiv className="start-dropshadow bg-primary flex-1 rounded-xl">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl md:text-3xl font-semibold">Vision</h2>
                <p className="text-justify">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum. Etiam eu erat at nulla eleifend ullamcorper ac non nunc. Integer tincidunt vehicula quam eu
                  convallis. Ut ullamcorper ultricies lorem, non accumsan dui tempus ac. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Etiam eu erat
                  at nulla eleifend ullamcorper ac non nunc. Integer tincidunt vehicula quam eu convallis.
                </p>
              </div>
            </StartDiv>
            <div className="relative w-full md:w-1/3 aspect-square md:flex md:items-end md:justify-end">
              <div className="relative w-3/4 h-3/4 md:w-full md:h-3/4">
                <Image
                  src="/about-us-image2.png"
                  alt="START Vision Design Image"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-8">
            <div className="relative w-full md:w-1/3 aspect-square">
              <Image
                src="/about-us-image3.png"
                alt="START Logo Mission Image"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <StartDiv className="start-dropshadow bg-accent flex-1 rounded-xl">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl md:text-3xl font-semibold">Mission</h2>
                <p className="text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit, leo ac vestibulum fermentum,
                  metus augue luctus enim, nec venenatis nulla libero at nisl. Mauris at velit et neque euismod cursus.
                  Cras ut lacus at purus dictum sollicitudin. Suspendisse varius libero vitae sem euismod, id efficitur
                  turpis condimentum. Aenean et leo orci. Donec luctus, nulla at venenatis pretium, erat lorem iaculis
                  lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam suscipit, leo ac vestibulum
                  fermentum, metus augue luctus enim, nec venenatis nulla libero at nisl. Mauris at velit et neque
                  euismod cursus. Cras ut lacus at purus dictum sollicitudin. Suspendisse varius libero vitae sem
                  euismod, id efficitur turpis condimentum. Aenean et leo orci.
                </p>
              </div>
            </StartDiv>
          </div>
        </div>
      </section>
    </div>
  )
}
