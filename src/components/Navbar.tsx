import MenuItems from "./MenuItems";

export default function Navbar() {
  return (
    <div className="px-4 py-4 border-b flex items-center justify-between">
      <div className="text-xl font-bold">Logo</div>
      <MenuItems />
    </div>
  );
}
