import type { ClientGame, Player } from "@/types/game";
import type { Message } from "@/types/Message";

export interface ServerToClientEvents {
  gameCreated: ({ roomId }: { roomId: string }) => void;
  gameUpdate: (game: ClientGame) => void;
  gameJoined: ({ roomId }: { roomId: string }) => void;
  recieveMessage: (message: Message) => void;
  roomNotFoundError: ({ message }: { message: string }) => void;
  roomExistence: (roomExist: boolean) => void;
  userDataUpdate: (player: Player) => void;
  errors: (errorMessage: string) => void;
  gameEnded: (message: string) => void;
}
