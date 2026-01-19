import GameCreation from "@/components/GameCreation";
import { PrimaryButton } from "@/components/ui/Button";
import CardRules from "@/docs/CardRules";
import HowToPlay from "@/docs/HowToPlay";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/docs")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center p-4 gap-8 h-24">
        <Link to="/">
          <PrimaryButton icon={<Home />}>Home</PrimaryButton>
        </Link>
        <div className="border mb-2" />
        <div>
          <GameCreation />
        </div>
      </div>
      <div className="m-4 mx-8 flex flex-col gap-2">
        <HowToPlay />
        <CardRules />
      </div>
      <p className="text-9xl text-red-500 text-center font-semibold">Work in Progress</p>
    </div>
  );
}
