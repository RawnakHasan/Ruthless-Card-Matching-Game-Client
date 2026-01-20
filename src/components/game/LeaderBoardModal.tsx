import { LeaderboardEntry } from "@/types/game/LeaderBoard";
import SpringModal from "@/components/ui/Dialog";
import UserAvatar from "@/components/UserAvatar";
import { ArrowLeft } from "lucide-react";
import { useUsernameStore } from "@/store/useUsernameStore";
import { PrimaryButton } from "@/components/ui/Button";
import { socket } from "@/lib/socket";
import { useRoomIdStore } from "@/store/useRoomIdStore";
// import { usePlayerStore } from "@/store/usePlayerStore";

type LeaderBoardProps = {
  leaderBoard: LeaderboardEntry[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const getBgColor = (position: number) => {
  switch (position) {
    case 1:
      return "bg-gold";
    case 2:
      return "bg-silver";
    case 3:
      return "bg-bronze";
    default:
      return "bg-zinc-300";
  }
};

const LeaderBoardModal = ({
  leaderBoard,
  isOpen,
  setIsOpen,
}: LeaderBoardProps) => {
  const { username } = useUsernameStore();
  const { roomId } = useRoomIdStore();
  // const mySocketId = usePlayerStore((state) => state.uuid);

  // Check if current user is host
  const isHost =
    leaderBoard.length > 0 && leaderBoard[0]?.username === username;

  const handlePlayAgain = () => {
    socket.emit("playAgain", { roomId });
    setIsOpen(false);
  };

  return (
    <SpringModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1 className="text-center text-4xl font-black mb-8">Leaderboard</h1>
      <div className="overflow-y-auto h-60 mb-6">
        <div className="flex flex-col gap-2">
          {leaderBoard.map((lead, _) => (
            <div
              key={_}
              className={`flex gap-6 rounded-xl px-4 py-2 ${getBgColor(lead.position)} items-center justify-between`}
            >
              <div className="flex gap-6 items-center">
                <p className="text-3xl font-bold">{lead.position}</p>
                <UserAvatar username={lead.username} />
                <h1 className="text-2xl font-semibold">{lead.username}</h1>
              </div>
              {lead.username === username && <ArrowLeft />}
            </div>
          ))}
        </div>
      </div>

      {isHost && (
        <PrimaryButton onClick={handlePlayAgain} className="w-full">
          Play Again
        </PrimaryButton>
      )}

      {!isHost && (
        <p className="text-center text-sm text-gray-600">
          Waiting for host to start a new game...
        </p>
      )}
    </SpringModal>
  );
};

export default LeaderBoardModal;
