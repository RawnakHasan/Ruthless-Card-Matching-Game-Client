import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { useUsernameStore } from "@/store/useUsernameStore";
import { PrimaryButton } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const roomIdForm = z.object({
  roomId: z
    .string()
    .min(6, "Room Id is only 6 Characters Long")
    .max(6, "Room Id is only 6 Characters Long"),
});

type RoomIdForm = z.infer<typeof roomIdForm>;

const GameCreation = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { username } = useUsernameStore();
  const navigate = useNavigate();

  const form = useForm<RoomIdForm>({
    resolver: zodResolver(roomIdForm),
  });

  useEffect(() => {
    socket.connect();

    socket.on("gameCreated", ({ roomId }) => {
      console.log(roomId);
      navigate({ to: `/game/${roomId}` });
    });

    socket.on("gameJoined", ({ roomId }) => {
      navigate({ to: `/game/${roomId}` });
    });

    socket.on("roomNotFoundError", ({ message }) => {
      form.clearErrors("roomId");
      setErrorMessage(message);
    });

    return () => {
      socket.off("gameCreated");
      socket.off("gameJoined");
      socket.off("roomNotFoundError");
    };
  }, [form, navigate]);

  const onSubmit = (data: RoomIdForm) => {
    const roomId = data.roomId;
    socket.emit("joinGame", { username, roomId });
    form.reset();
  };

  const handleCreateGame = () => {
    socket.emit("createGame", { username });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-8">
        <PrimaryButton onClick={handleCreateGame}>Create Room</PrimaryButton>
        <div className="border" />
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="roomId-form"
          className="flex gap-4"
        >
          <Input
            {...form.register("roomId", {
              onChange: () => setErrorMessage(""),
            })}
            placeholder="Enter Room Code"
            className="focus:bg-violet-500"
          />
          <PrimaryButton type="submit" form="roomId-form">
            Enter Room
          </PrimaryButton>
        </form>
      </div>
      <span className="text-error text-center">
        {errorMessage || form.formState.errors.roomId?.message}
      </span>
    </div>
  );
};
export default GameCreation;
