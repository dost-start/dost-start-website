export default function StartDivider({
  direction = "horizontal",
  variant = "primary",
  width = "100%",
}) {
  const isHorizontal = direction === "horizontal";
  const primaryColor = "bg-primary border-2";
  const accentColor = "bg-accent border-2";
  const colorClass = variant === "primary" ? primaryColor : accentColor;
  const defaultSize = "10px";

  return (
    <div
      className={`border-2 ${colorClass} rounded-md`}
      style={
        isHorizontal
          ? { width, height: defaultSize }
          : { width: defaultSize, height: width }
      }
    />
  );
}
