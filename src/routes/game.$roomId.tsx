import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { useRoomIdStore } from "@/store/useRoomIdStore";
import Sidebar from "@/components/game/Sidebar";
import GameBoard from "@/components/game/GameBoard";
import { useGameStore } from "@/store/useGameStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { useUsernameStore } from "@/store/useUsernameStore";
import { toast } from "sonner";
import { ClientGame, Player } from "@/types";
import { LeaderboardEntry } from "@/types/game/LeaderBoard";
import LeaderBoardModal from "@/components/game/LeaderBoardModal";

export const Route = createFileRoute("/game/$roomId")({
  component: RouteComponent,
});

const playCardOneTime = new Audio("/sounds/playCard.mp3");
const playCardTwoTimes = new Audio("/sounds/playCardTwoTimes.mp3");
const playCardThreeTimes = new Audio("/sounds/playCardThreeTimes.mp3");
const playCardFourTimes = new Audio("/sounds/playCardFourTimes.mp3");
const playCardMoreThanFourTimes = new Audio(
  "/sounds/playCardMoreThanFourTimes.mp3",
);
const Volume = 0.6;

function RouteComponent() {
  const { roomId } = Route.useParams();

  const { setRoomId } = useRoomIdStore();
  const { username } = useUsernameStore();
  const navigate = useNavigate();

  const { setGameState } = useGameStore();
  const { setPlayer } = usePlayerStore();

  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const [leaderBoardState, setLeaderBoardState] = useState<LeaderboardEntry[]>(
    [],
  );

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

    const handleCardPlayed = () => {
      playCardOneTime.volume = 0.6;
      playCardOneTime.play().catch(() => {});
    };

    const handleRoomExistence = (roomExistence: boolean) => {
      if (roomExistence === false) {
        navigate({ to: "/" });
      }
    };

    const handleSetGameState = (game: ClientGame) => {
      setGameState(game);
    };

    const handleSetPlayerState = (player: Player) => {
      setPlayer(player);
    };

    const handleLeaderBoardState = (leaderBoard: LeaderboardEntry[]) => {
      setShowLeaderBoard(true);
      setLeaderBoardState(leaderBoard);
    };

    const handleGotCard = ({ count }: { count: number }) => {
      if (count === 1) {
        playCardOneTime.volume = Volume;
        playCardOneTime.play().catch(() => {});
      } else if (count === 2) {
        playCardTwoTimes.volume = Volume;
        playCardTwoTimes.play().catch(() => {});
      } else if (count === 3) {
        playCardThreeTimes.volume = Volume;
        playCardThreeTimes.play().catch(() => {});
      } else if (count === 4) {
        playCardFourTimes.volume = Volume;
        playCardFourTimes.play().catch(() => {});
      } else if (count > 4) {
        playCardMoreThanFourTimes.volume = Volume;
        playCardMoreThanFourTimes.play().catch(() => {});
      }
    };

    const handleGameReset = ({ message }: { message: string }) => {
      setShowLeaderBoard(false);
      toast.success("Game Reset", { description: message });
    };

    socket.on("cardPlayed", handleCardPlayed);
    socket.on("roomExistence", handleRoomExistence);
    socket.on("gameUpdate", handleSetGameState);
    socket.on("userDataUpdate", handleSetPlayerState);
    socket.on("gotCard", handleGotCard);
    socket.on("leaderBoard", handleLeaderBoardState);
    socket.on("gameReset", handleGameReset);

    return () => {
      socket.off("errors", handleError);
      socket.off("cardPlayed", handleCardPlayed);
      socket.off("roomExistence", handleRoomExistence);
      socket.off("gameUpdate", handleSetGameState);
      socket.off("userDataUpdate", handleSetPlayerState);
      socket.off("gameReset", handleGameReset);
    };
  }, [roomId, setRoomId, username, navigate, setGameState, setPlayer]);

  return (
    <div className="min-h-screen min-w-screen relative flex p-4 justify-center">
      <div className="hidden sm:flex flex-col items-center justify-between">
        <Sidebar />
      </div>
      <div className="hidden sm:inline border mx-4" />
      <GameBoard />
      <LeaderBoardModal
        isOpen={showLeaderBoard}
        setIsOpen={setShowLeaderBoard}
        leaderBoard={leaderBoardState}
      />
    </div>
  );
}
