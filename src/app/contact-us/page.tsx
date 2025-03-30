import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import image from "../../../public/contact-image.png";
import StartDiv from "@/components/StartDiv";
import socialLinks from "@/components/SocialLinks";
import ContactForm from "@/components/contact/ContactForm";

export default function page() {
  return (
    <div className="px-1 text-white max-w-[1200px]">
      <PageTitle text="Contact Us" />

      <section className="mb-12 relative rounded-2xl border-4 z-10 overflow-hidden">
        <Image
          src={image}
          alt="Contact Us"
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="absolute z-50 text-white bottom-[50px] left-[50px]">
          <h2 className=" hidden lg:text-4xl font-bold">Reach Us!</h2>
          <p className="hidden lg:block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
            provident? Molestias in expedita et. Vero iusto temporibus eum
            reiciendis molestias quaerat quo obcaecati ad. Ipsam numquam optio
            reiciendis dignissimos doloremque.
          </p>
        </div>
      </section>

      <section>
        <StartDiv className="bg-primary border-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
            <p className="mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              illo architecto tenetur hic placeat eos praesentium dolorum quam,
              similique quia maxime harum quaerat? Atque doloremque quod amet,
              asperiores quidem est.
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
          <div>
            <h2 className="text-3xl font-bold mb-4">Message us!</h2>
            <ContactForm />
          </div>
        </StartDiv>
      </section>
    </div>
  );
}
