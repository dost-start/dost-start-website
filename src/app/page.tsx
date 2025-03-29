import StartDiv from "@/components/StartDiv";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="p-10 space-y-3">
      <div className="flex gap-2 flex-wrap">
        <Button>This is a button</Button>
        <Button variant={"accent"}>This is an accent button</Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <StartDiv>This is a Start div</StartDiv>

        <StartDiv className="border-4">
          This is a Start div with a thicker border
        </StartDiv>

        <StartDiv className="start-dropshadow">
          This is a start div with the signature drop shadow
        </StartDiv>
        <StartDiv className="start-dropshadow border-4">
          This is a start div with the signature drop shadow and a thicker
          border
        </StartDiv>
        <StartDiv className="start-dropshadow bg-accent">
          This is a start div with the signature drop shadow and an accent
          background
        </StartDiv>
        <StartDiv className="start-dropshadow bg-primary">
          This is a start div with the signature drop shadow and a primary
          background
        </StartDiv>
      </div>
      <div className="flex gap-2 flex-col">

        <h1 className="text-lg">
          Roboto is the default font 
        </h1>
        <h1 className="text-muted-foreground font-orbitron text-3xl">
          This uses the orbitron font
        </h1>

        <h1 className="font-montserrat text-lg">
          This uses the montserrat font
        </h1>
      </div>
    </div>
  );
}
