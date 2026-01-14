import { io, Socket } from "socket.io-client";
import { serverUrl } from "@/env";
import { ClientToServerEvents, ServerToClientEvents } from "@/types";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  serverUrl,
  {
    autoConnect: false,
  }
);
