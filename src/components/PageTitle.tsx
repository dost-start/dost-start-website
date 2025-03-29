export default function PageTitle({ text }: { text?: string }) {
  return (
    <h1 className="text-muted-foreground font-orbitron text-2xl md:text-3xl my-6">
      {text}
    </h1>
  );
}
