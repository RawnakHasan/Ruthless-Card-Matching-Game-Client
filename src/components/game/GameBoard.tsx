import { CopyCheck, Play } from "lucide-react";
import {
  useCurrentTurn,
  useGamePhase,
  useHostSocketId,
  usePlayers,
} from "@/hooks/gameSelectors";
import { PrimaryButton } from "@/components/ui/Button";
import PlayerComponent from "@/components/game/PlayerComponent";
import PlayerHand from "@/components/game/PlayerHand";
import DiscardPile from "@/components/game/DiscardPile";
import { useRoomIdStore } from "@/store/useRoomIdStore";
import { useState } from "react";
import { socket } from "@/lib/socket";
import { usePlayerStore } from "@/store/usePlayerStore";
import { List, MessageCircleMore } from "lucide-react";
import PlayersList from "@/components/game/PlayersList";
import Chat from "@/components/Chat";
import SpringModal from "@/components/ui/Dialog";
import { useGameStore } from "@/store/useGameStore";

const GameBoard = () => {
  const gamePhase = useGamePhase();
  const players = usePlayers();
  const currentTurn = useCurrentTurn();
  const currentPlayer = players.find((player) => player.id === currentTurn);
  const drawCount = useGameStore((state) => state.drawCount);
  const { roomId } = useRoomIdStore();
  const [copied, setCopied] = useState(false);
  const mySocketId = usePlayerStore((state) => state.uuid);
  const hostSocketId = useHostSocketId();
  const amIHost = mySocketId === hostSocketId;
  const [openPlayersList, setOpenPlayersList] = useState<boolean>(false);
  const [openChat, setOpenChat] = useState<boolean>(false);

  return (
    <div className="h-full w-full flex flex-col items-center sm:gap-0 gap-3">
      <div
        className="h-1/8 w-full sm:p-4 flex items-center"
        style={
          gamePhase === "waiting"
            ? { justifyContent: "space-between" }
            : { justifyContent: "end" }
        }
      >
        {amIHost && gamePhase !== "playing" && (
          <PrimaryButton
            icon={<Play />}
            onClick={() => socket.emit("startGame", { roomId })}
          >
            Play
          </PrimaryButton>
        )}
        {gamePhase !== "playing" && (
          <span
            className="hidden sm:inline-flex px-4 py-2 bg-secondary rounded-xl text-xl cursor-pointer select-none active:scale-95 transition"
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
        <div className="border-2 border-text rounded-full p-2 bg-background">
          {currentPlayer && <PlayerComponent player={currentPlayer} />}
        </div>
      </div>
      <div className="border w-full" />
      <div className="sm:h-4/8 min-h-60 w-full sm:p-2 flex items-center justify-center relative">
        <DiscardPile />
        {gamePhase === "playing" && (
          <div className="sm:absolute sm:top-4 sm:right-4 flex flex-col items-center gap-2">
            <img
              onClick={() =>
                socket.emit("getCard", { roomId, socketId: mySocketId })
              }
              className="active:scale-95 w-16 transition cursor-pointer hover:scale-105"
              src="/Cards/Back.svg"
              alt="Card Back"
            />
            <p className="">Draw Count: {drawCount}</p>
          </div>
        )}
        {gamePhase !== "playing" && (
          <span
            className="inline-flex sm:hidden px-4 py-2 bg-secondary rounded-xl text-xl cursor-pointer select-none active:scale-95 transition absolute top-4"
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
      </div>
      <div className="border w-full" />
      <div className="h-3/8 min-h-60 w-full pb-2 sm:p-2 flex items-center justify-center border-b-2">
        {gamePhase === "waiting" ? "No Cards has been Dealt" : <PlayerHand />}
      </div>
      <div className="flex items-center justify-evenly w-full">
        <div
          onClick={() => setOpenPlayersList(true)}
          className="active:scale-95 transition sm:hidden bg-primary bottom-8 right-8 flex items-center justify-center aspect-square rounded-full size-16"
        >
          <List size={32} />
        </div>
        <div
          onClick={() => setOpenChat(true)}
          className="active:scale-95 transition sm:hidden bg-primary bottom-8 left-8 flex items-center justify-center aspect-square rounded-full size-16"
        >
          <MessageCircleMore size={32} />
        </div>
        <SpringModal isOpen={openPlayersList} setIsOpen={setOpenPlayersList}>
          <PlayersList />
        </SpringModal>
        <SpringModal title="Messages" setIsOpen={setOpenChat} isOpen={openChat}>
          <Chat />
        </SpringModal>
      </div>
    </div>
  );
};
export default GameBoard;
