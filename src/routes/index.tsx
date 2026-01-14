import { createFileRoute } from "@tanstack/react-router";
import { useUsernameStore } from "@/store/useUsernameStore";
import { UsernameForm } from "@/components/UsernameForm";
import UserComponent from "@/components/UserComponent";
import GameCreation from "@/components/GameCreation";
import { serverUrl } from "@/env";
import GradientText from "@/components/ui/GradientText";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { username } = useUsernameStore();

  console.log(serverUrl);

  return (
    <div className="h-screen flex flex-col sm:gap-36 gap-24 items-center justify-center min-w-96 p-8">
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
    </div>
  );
}
