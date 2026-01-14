import type { Socket } from "socket.io-client";
import type { ClientToServerEvents } from "@/types/socket/ClientToServerEvents";
import type { ServerToClientEvents } from "@/types/socket/ServerToClientEvents";

export * from "@/types/socket/ClientToServerEvents";
export * from "@/types/socket/ServerToClientEvents";
export type CustomSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
