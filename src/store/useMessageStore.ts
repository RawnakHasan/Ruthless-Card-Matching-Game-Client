import { create } from "zustand";
import { Message } from "@/types/Message";

type MessageStore = {
  messages: Message[];
  setMessages: (message: Message) => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  setMessages: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));
