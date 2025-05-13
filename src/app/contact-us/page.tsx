import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import image from "../../../public/contact-image.png";
import StartDiv from "@/components/StartDiv";
import socialLinks from "@/components/SocialLinks";
import ContactForm from "@/components/contact/ContactForm";
import MaxLayout from "@/components/MaxLayout";

export default function page() {
  return (
    <MaxLayout>
      <div className="px-1 text-white">
        <PageTitle text="Contact Us" />

        <section className="mb-12 relative rounded-2xl border-4 z-10 overflow-hidden">
          <Image src={image} alt="Contact Us" className="object-cover w-full" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/80 to-transparent" />
          <div className="absolute z-30 text-white bottom-[50px] left-[50px]">
            <h2 className=" hidden lg:block lg:text-4xl font-bold">
              Reach Us!
            </h2>
            <p className="hidden lg:block">
              At START, we believe in the power of meaningful connections.
              Whether you&apos;re a scholar with a big idea, a partner
              interested in collaboration, or a curious visitor wanting to know
              more, we&apos;re here to listen. Reach out and let’s work together
              to build a future driven by innovation, leadership, and unity
              among Filipino tech scholars.
            </p>
          </div>
        </section>

        <section>
          <StartDiv className="bg-primary border-4 grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden z-30">
            <div
              className="h-full w-full absolute start-0 top-0 object-cover z-0"
              style={{
                backgroundImage: "url(/texture.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.2,
              }}
            ></div>
            <div className="z-10">
              <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
              <p className="mb-8">
                We&apos;re always one message away! For inquiries, partnerships,
                or feedback, feel free to connect with us through any of our
                official channels. Let’s start a conversation and explore new
                possibilities for growth, leadership, and innovation together!
              </p>
              <ul className="space-y-2">
                {socialLinks.map(({ icon: Icon, text, link }) => (
                  <li
                    key={text}
                    className="flex items-center gap-3 font-semibold hover:font-bold cursor-pointer w-fit"
                  >
                    <Icon size={25} />
                    <a href={link} target="_blank">
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="z-10">
              <h2 className="text-3xl font-bold mb-4">Message us!</h2>
              <ContactForm />
            </div>
          </StartDiv>
        </section>
      </div>
    </MaxLayout>
  );
}
