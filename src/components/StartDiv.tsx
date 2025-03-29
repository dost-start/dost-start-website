import { twMerge } from "tailwind-merge";

export default function StartDiv({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  //twMerge is a function that merges classes together to avoid duplication
  return (
    <div className={twMerge(`start-border-radius border-2 p-6 ${className}`)}>
      {children}
    </div>
  );
}
