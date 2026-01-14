import { useGameStore } from "../store/useGameStore";

export const usePlayers = () => useGameStore((state) => state.players);

export const useGamePhase = () => useGameStore((state) => state.gamePhase);

export const useDiscardPile = () => useGameStore((state) => state.discardPile);

export const useRotation = () => useGameStore((state) => state.rotation);

export const useDrawCount = () => useGameStore((state) => state.drawCount);

export const useCurrentTurn = () => useGameStore((state) => state.playerTurn);

export const useHostSocketId = () =>
  useGameStore((state) => state.hostSocketId);
