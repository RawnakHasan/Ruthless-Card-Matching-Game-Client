import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { socket } from "@/lib/socket";
import { useRoomIdStore } from "@/store/useRoomIdStore";
import Sidebar from "@/components/game/Sidebar";
import GameBoard from "@/components/game/GameBoard";
import { useGameStore } from "@/store/useGameStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useUsernameStore } from "@/store/useUsernameStore";
import { toast } from "sonner";

export const Route = createFileRoute("/game/$roomId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { roomId } = Route.useParams();

  const { setRoomId } = useRoomIdStore();
  const { username } = useUsernameStore();
  const navigate = useNavigate();

  const { setGameState } = useGameStore();
  const { setPlayer } = usePlayerStore();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
      socket.emit("joinGame", { username, roomId });
    }

    socket.emit("checkRoomExistence", roomId);
    socket.emit("updateGame", { roomId });

    const handleError = (errorMessage: string) => {
      toast.error("Error", { description: errorMessage });
    };
    socket.on("errors", handleError);

    setRoomId(roomId);

    return () => {
      socket.off("errors", handleError);
    };
  }, [roomId, setRoomId, username]);

  socket.on("roomExistence", (roomExistence) => {
    if (roomExistence === false) {
      navigate({ to: "/" });
    }
  });

  socket.on("gameUpdate", (game) => {
    setGameState(game);
  });

  socket.on("userDataUpdate", (player) => {
    setPlayer(player);
  });

  return (
    <div className="min-h-screen min-w-screen relative flex p-4 justify-center">
      <div className="hidden sm:flex flex-col items-center justify-between">
        <Sidebar />
      </div>
      <div className="hidden sm:inline border mx-4" />
      <GameBoard />
    </div>
  );
}
