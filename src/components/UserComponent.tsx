import { useState } from "react";
import { useUsernameStore } from "@/store/useUsernameStore";
import UserAvatar from "@/components/UserAvatar";
import SpringModal from "@/components/ui/Dialog";
import { DestructiveButton } from "@/components/ui/Button";

const UserComponent = () => {
  const [open, setOpen] = useState(false);

  const { username, resetUsername } = useUsernameStore();
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex gap-4 items-center p-2 border-2 border-text rounded-full"
      >
        <UserAvatar username={username} />
        <span className="text-xl font-semibold">{username}</span>
      </div>

      <SpringModal isOpen={open} setIsOpen={setOpen} title="Settings">
        <p>Reset Your Username</p>

        <div className="mt-6 flex justify-end gap-2">
          <DestructiveButton onClick={resetUsername}>
            Reset Username
          </DestructiveButton>
        </div>
      </SpringModal>
    </>
  );
};
export default UserComponent;
