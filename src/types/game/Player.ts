import type { Card } from "@/types/game/Card";

export type PlayerStatus =
  | { type: "Playing" }
  | { type: "Finished"; position: number }
  | { type: "Eliminated"; position: number };

export type Player = {
  username: string;
  id: number;
  uuid: string;
  hand: Card[];
  host: boolean;
  status: PlayerStatus;
};

export type ClientPlayer = {
  username: string;
  id: number;
  uuid: string;
  host: boolean;
  cardCount: number;
  status: "Playing" | "Finished" | "Eliminated";
};
