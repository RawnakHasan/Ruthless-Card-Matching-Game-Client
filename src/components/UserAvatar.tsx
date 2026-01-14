import { createAvatar } from "@dicebear/core";
import { shapes } from "@dicebear/collection";

const UserAvatar = ({ username }: { username: string }) => {
  const avatar = createAvatar(shapes, {
    seed: username,
  });
  return (
    <img
      className="rounded-full size-12 border-text border-2"
      src={avatar.toDataUri()}
    />
  );
};
export default UserAvatar;
