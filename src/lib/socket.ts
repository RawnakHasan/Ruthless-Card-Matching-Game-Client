import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../env";
import { ClientToServerEvents, ServerToClientEvents } from "../types";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SERVER_URL,
  {
    autoConnect: false,
  }
);
