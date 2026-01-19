import { createFileRoute, Link } from "@tanstack/react-router";
import { useUsernameStore } from "@/store/useUsernameStore";
import { UsernameForm } from "@/components/UsernameForm";
import UserComponent from "@/components/UserComponent";
import GameCreation from "@/components/GameCreation";
import { serverUrl } from "@/env";
import GradientText from "@/components/ui/GradientText";
import { PrimaryButton } from "@/components/ui/Button";
import { FileText, Grip } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { username } = useUsernameStore();

  console.log(serverUrl);

  return (
    <div className="relative h-screen flex flex-col sm:gap-36 gap-24 items-center justify-center min-w-96 p-8">
      <GradientText className="text-3xl p-2">
        Welcome to Ruthless Card Matching Game
      </GradientText>
      {username === "" ? (
        <UsernameForm />
      ) : (
        <div className="flex flex-col items-center justify-center gap-8">
          <UserComponent />
          <GameCreation />
        </div>
      )}
      <Link to="/docs" className="absolute bottom-8 right-8">
        <PrimaryButton icon={<FileText />}>Docs</PrimaryButton>
      </Link>
      <Link to="/deck" className="absolute bottom-26 right-8">
        <PrimaryButton icon={<Grip />}>Deck</PrimaryButton>
      </Link>
    </div>
  );
}
