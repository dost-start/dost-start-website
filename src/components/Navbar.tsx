import { maxWidth } from "@/utils/globals";
import MenuItems from "./MenuItems";

export default function Navbar() {
  return (
    <div className="px-4 py-4 border-b ">
      <div className={`max-w-[${maxWidth}px] flex items-center justify-between`}>
        <div className="text-xl font-bold">Logo</div>
        <MenuItems />
      </div>
    </div>
  );
}
