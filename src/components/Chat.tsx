import { useEffect, useRef, useState } from "react";
import { socket } from "@/lib/socket";
import { useUsernameStore } from "@/store/useUsernameStore";
import { Input } from "@/components/ui/Input";
import { useRoomIdStore } from "@/store/useRoomIdStore";
import { PrimaryButton } from "@/components/ui/Button";
import { Send } from "lucide-react";
import { useMessageStore } from "@/store/useMessageStore";
import { Message } from "@/types/Message";

function Chat() {
  const { username } = useUsernameStore();
  const { roomId } = useRoomIdStore();

  const { messages, setMessages } = useMessageStore();

  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const messageSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    messageSoundRef.current = new Audio("/sounds/messageAudio.mp3");
  }, []);

  useEffect(() => {
    socket.connect();

    socket.on("recieveMessage", (message) => {
      setMessages(message);

      if (message.sender !== username) {
        messageSoundRef.current?.play().catch(() => {});
      }

      messageSoundRef.current?.play().catch(() => {
        // autoplay blocked (browser policy)
      });
    });

    return () => {
      socket.off("recieveMessage");
    };
  }, [username, setMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      message: input,
      sender: username,
      timestamp: Date.now(),
    };

    setMessages(newMessage);

    socket.emit("sendMessage", {
      roomId,
      message: input,
      username,
    });

    setInput("");
  };

  return (
    <div className="h-1/2 flex flex-col gap-4 justify-between min-h-0">
      <div className="flex flex-col gap-0.5 overflow-y-auto min-h-0 max-h-96">
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
        <PrimaryButton
          onClick={sendMessage}
          icon={<Send />}
          className="sm:hidden"
        >
          Send
        </PrimaryButton>
      </div>
    </div>
  );
}

export default Chat;
