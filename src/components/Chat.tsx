import { useEffect, useRef, useState } from "react";
import { socket } from "@/lib/socket";
import { useUsernameStore } from "@/store/useUsernameStore";
import { Input } from "@/components/ui/Input";
import { useRoomIdStore } from "@/store/useRoomIdStore";
import { Message } from "@/types/Message";

function Chat() {
  const { username } = useUsernameStore();
  const { roomId } = useRoomIdStore();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.connect();

    socket.on("recieveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("recieveMessage");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    socket.emit("sendMessage", {
      roomId,
      message: input,
      username,
    });

    setInput("");
  };

  return (
    <div className="h-1/2 flex flex-col justify-between min-h-0">
      <div className="flex flex-col gap-0.5 overflow-y-auto min-h-0">
        {messages.map((msg) => (
          <div className="border-b min-w-0" key={msg.timestamp}>
            <span className="font-semibold">{msg.sender}</span>:{" "}
            <span className="break-all">{msg.message}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <Input
          className="w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
}

export default Chat;
