import Image from "next/image";
import MenuItems from "./MenuItems";
import logo from "../../public/logo.png";

export default function Navbar() {
  return (
    <div className="sticky top-0 shadow-md bg-background z-40">
      <div className="max-w-[1920px] px-4 py-4 flex items-center justify-between   mx-auto">
        <Image src={logo} alt="Start Logo" height={50} />
        <MenuItems />
      </div>
    </div>
  );
}
