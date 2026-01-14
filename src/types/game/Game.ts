import type { Card } from "@/types/game/Card";
import type { ClientPlayer, Player } from "@/types/game/Player";

export type GamePhase = "waiting" | "playing" | "finished";

export type Game = {
  players: Player[];
  deck: Card[];
  discardPile: Card[];
  rotation: 1 | -1;
  gamePhase: GamePhase;
  hostSocketId: string;
  drawCount: number;
  playerTurn: number;
};

export type ClientGame = {
  players: ClientPlayer[];
  discardPile: Card[];
  rotation: 1 | -1;
  gamePhase: GamePhase;
  hostSocketId: string;
  drawCount: number;
  playerTurn: number;
};
