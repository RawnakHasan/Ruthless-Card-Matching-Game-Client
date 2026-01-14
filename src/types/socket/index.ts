import type { Server, Socket } from "socket.io";
import type { ClientToServerEvents } from "./ClientToServerEvents";
import type { ServerToClientEvents } from "./ServerToClientEvents";

export * from "./ClientToServerEvents";
export * from "./ServerToClientEvents";
export type CustomSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export type CustomIo = Server<ClientToServerEvents, ServerToClientEvents>;
