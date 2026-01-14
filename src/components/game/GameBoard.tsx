import { CopyCheck, Play } from "lucide-react";
import {
  useCurrentTurn,
  useGamePhase,
  useHostSocketId,
  usePlayers,
} from "../../hooks/gameSelectors";
import { PrimaryButton } from "../ui/Button";
import PlayerComponent from "./PlayerComponent";
import PlayerHand from "./PlayerHand";
import DiscardPile from "./DiscardPile";
import { useRoomIdStore } from "../../store/useRoomIdStore";
import { useState } from "react";
import { socket } from "../../lib/socket";
import { usePlayerStore } from "../../store/usePlayerStore";

const GameBoard = () => {
  const gamePhase = useGamePhase();
  const players = usePlayers();
  const currentTurn = useCurrentTurn();
  const currentPlayer = players.find((player) => player.id === currentTurn);
  const { roomId } = useRoomIdStore();
  const [copied, setCopied] = useState(false);
  const mySocketId = usePlayerStore((state) => state.uuid);
  const hostSocketId = useHostSocketId();
  const amIHost = mySocketId === hostSocketId;

  return (
    <div className="h-full w-5/6 flex flex-col items-center">
      <div className="h-1/8 w-full p-4 flex justify-between items-center">
        {amIHost && (
          <PrimaryButton
            onClick={() => socket.emit("startGame", { roomId })}
            className="aspect-square"
          >
            <Play />
          </PrimaryButton>
        )}
        {gamePhase !== "playing" && (
          <span
            className="px-4 py-2 bg-secondary rounded-xl text-xl cursor-pointer select-none active:scale-95 transition"
            onClick={async () => {
              await navigator.clipboard.writeText(roomId);
              setCopied(true);
              setTimeout(() => setCopied(false), 1200);
            }}
          >
            {copied ? (
              <p className="flex items-center justify-center gap-2">
                <CopyCheck />
                Copied!
              </p>
            ) : (
              roomId
            )}
          </span>
        )}
        <div className="border-2 border-text rounded-full p-2 pr-4 bg-background">
          {currentPlayer && <PlayerComponent player={currentPlayer} />}
        </div>
      </div>
      <div className="border w-full" />
      <div className="h-4/8 w-full p-2 flex items-center justify-center relative">
        <DiscardPile />
        {gamePhase === "playing" && (
          <img
            onClick={() =>
              socket.emit("getCard", { roomId, socketId: mySocketId })
            }
            className="absolute top-4 right-4 w-16 active:scale-95 transition cursor-pointer hover:scale-105"
            src="/Cards/Back.svg"
            alt="Card Back"
          />
        )}
      </div>
      <div className="border w-full" />
      <div className="h-3/8 w-full p-2 flex items-center justify-center border-b-2">
        {gamePhase === "waiting" ? "No Cards has been Dealt" : <PlayerHand />}
        {gamePhase === "finished" && "Show Leaderboard"}
      </div>
    </div>
  );
};
export default GameBoard;
