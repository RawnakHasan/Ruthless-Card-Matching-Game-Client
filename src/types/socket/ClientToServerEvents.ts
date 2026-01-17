import type { Card } from "@/types/game";

export interface ClientToServerEvents {
  createGame: ({ username }: { username: string }) => void;

  joinGame: ({
    username,
    roomId,
  }: {
    username: string;
    roomId: string;
  }) => void;

  updateGame: ({ roomId }: { roomId: string }) => void;

  startGame: ({ roomId }: { roomId: string }) => void;

  endGame: ({ roomId }: { roomId: string }) => void;

  playCard: ({ card, roomId }: { card: Card; roomId: string }) => void;

  getCard: ({ roomId, socketId }: { roomId: string; socketId: string }) => void;

  checkRoomExistence: (roomId: string) => void;

  sendMessage: ({
    roomId,
    message,
    username,
  }: {
    roomId: string;
    message: string;
    username: string;
  }) => void;

  swapHands: ({
    roomId,
    targetPlayerId,
  }: {
    roomId: string;
    targetPlayerId: number;
    card: Card;
  }) => void;
}
