import clsx from "clsx";

export default function MaxLayout({ children }: { children: React.ReactNode }) {
  return <div className={clsx("max-w-[1400px] mx-auto")}>{children}</div>;
}
