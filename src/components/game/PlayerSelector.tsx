import { DestructiveButton } from "@/components/ui/Button";
import { usePlayers } from "@/hooks/gameSelectors";
import UserAvatar from "@/components/UserAvatar";
import { useUsernameStore } from "@/store/useUsernameStore";
import { ClientPlayer } from "@/types";
import SpringModal from "@/components/ui/Dialog";

type PlayerSelectorProps = {
  handlePlayerSelection: (player: ClientPlayer) => void;
  handleCancel: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const PlayerSelector = ({
  handlePlayerSelection,
  handleCancel,
  isOpen,
  setIsOpen,
}: PlayerSelectorProps) => {
  const players = usePlayers();
  const activePlayers = players.filter((p) => p.status === "Playing");
  const { username } = useUsernameStore();

  return (
    <SpringModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h2 className="text-3xl font-bold mb-6 text-center">Select A Player</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {activePlayers.map((player, _) => (
          <div
            style={player.username === username ? { display: "none" } : {}}
            onClick={() => handlePlayerSelection(player)}
            key={_}
            className="flex items-center gap-4 cursor-pointer hover:bg-violet-500/50 active:scale-95 hover:scale-105 transition border-2 border-text rounded-full p-2 pr-4 bg-background"
          >
            <div className="relative">
              <UserAvatar username={player.username} />
              {player.cardCount === 0 ? (
                ""
              ) : (
                <span className="absolute -bottom-2 -left-2 bg-primary aspect-square rounded-full size-6 flex items-center justify-center text-sm">
                  {player.cardCount}
                </span>
              )}
            </div>
            <h1
              className="text-xl max-w-32 truncate inline-block"
              title={player.username}
            >
              <span className="flex items-center justify-center gap-3">
                {player.username}
              </span>
            </h1>
          </div>
        ))}
      </div>

      <DestructiveButton className="w-full" onClick={handleCancel}>
        Cancel
      </DestructiveButton>
    </SpringModal>
  );
};
export default PlayerSelector;
