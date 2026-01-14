import { createFileRoute } from "@tanstack/react-router";
import { useUsernameStore } from "../store/useUsernameStore";
import { UsernameForm } from "../components/UsernameForm";
import UserComponent from "../components/UserComponent";
import GameCreation from "../components/GameCreation";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { username } = useUsernameStore();

  return (
    <div className="h-screen flex items-center justify-center">
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
