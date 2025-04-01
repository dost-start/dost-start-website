import { twMerge } from "tailwind-merge";

export default function StartDiv({
  children,
  className,
  style,
}: {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  //twMerge is a function that merges classes together to avoid duplication
  return (
    <div
      className={twMerge(`start-border-radius border-2 p-8 ${className}`)}
      style={style}
    >
      {children}
    </div>
  );
}
