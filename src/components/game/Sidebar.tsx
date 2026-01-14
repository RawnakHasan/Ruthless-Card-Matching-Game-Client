import Chat from "../Chat";
import PlayersList from "./PlayersList";

const Sidebar = () => {
  return (
    <div className="w-1/6 min-w-0 flex flex-col items-center justify-between">
      <PlayersList />
      <div className="border w-full my-2" />
      <Chat />
    </div>
  );
};
export default Sidebar;
