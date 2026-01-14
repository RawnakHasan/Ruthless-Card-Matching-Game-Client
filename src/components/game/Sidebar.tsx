import Chat from "@/components/Chat";
import PlayersList from "@/components/game/PlayersList";

const Sidebar = () => {
  return (
    <>
      <PlayersList />
      <div className="border w-full my-2" />
      <Chat />
    </>
  );
};
export default Sidebar;
