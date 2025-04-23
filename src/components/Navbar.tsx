import Image from "next/image";
import MenuItems from "./MenuItems";
import logo from "../../public/logo.png";

export default function Navbar() {
  return (
    <div className="px-4 py-4 flex items-center justify-between shadow-md sticky top-0 bg-background z-40">
      <Image src={logo} alt="Start Logo" height={50} />
      <MenuItems />
    </div>
  );
}
