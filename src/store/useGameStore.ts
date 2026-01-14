import { create } from "zustand";
import { ClientGame } from "@/types";

interface GameStore extends ClientGame {
  setGameState: (game: ClientGame) => void;
  resetGameState: () => void;
}

const initialState: ClientGame = {
  players: [],
  discardPile: [],
  rotation: 1,
  gamePhase: "waiting",
  hostSocketId: "",
  drawCount: 0,
  playerTurn: 0,
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,

  setGameState: (game) =>
    set((state) => ({
      ...state,
      ...game,
    })),

  resetGameState: () => set(initialState),
}));
