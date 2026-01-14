import { create } from "zustand";

interface RoomIdStore {
  roomId: string;
  setRoomId: (roomId: string) => void;
  resetRoomId: () => void;
}

export const useRoomIdStore = create<RoomIdStore>((set) => ({
  roomId: "H",
  setRoomId: (roomId) => set({ roomId }),
  resetRoomId: () => set({ roomId: "" }),
}));
