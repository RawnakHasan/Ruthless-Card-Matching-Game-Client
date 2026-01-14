import type { Card } from "./Card";

export type Player = {
  username: string;
  id: number;
  uuid: string;
  hand: Card[];
  host: boolean;
};

export type ClientPlayer = {
  username: string;
  id: number;
  uuid: string;
  host: boolean;
  cardCount: number;
};
