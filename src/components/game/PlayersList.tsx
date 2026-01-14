import { usePlayers } from "../../hooks/gameSelectors";
import PlayerComponent from "./PlayerComponent";

const PlayersList = () => {
  const playersList = usePlayers();

  return (
    <div className="flex flex-col gap-2 w-full h-1/2">
      <h1 className="text-2xl font-bold">Players</h1>
      <div className="border w-full" />
      <div className="flex flex-col gap-4 p-2 overflow-y-auto">
        {playersList.map((player, _) => (
          <PlayerComponent key={_} player={player} />
        ))}
      </div>
    </div>
  );
};
export default PlayersList;
