import Image from "next/image";
import MenuItems from "./MenuItems";
import logo from "../../public/logo.png"

export default function Navbar() {
  return (
    <div className="px-4 py-4 border-b flex items-center justify-between">
      <Image src={logo} alt="Start Logo" height={50}/>
      <MenuItems />
    </div>
  );
}
