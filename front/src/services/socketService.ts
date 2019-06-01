import io from "socket.io-client";
import { PORT, PROTOCOL, URL, SOCKET_EVENTS } from "Constants";
import { ISocketData } from "Models";

export class SocketHandler {
  socket: any;
  action: () => void;
  pollId: string;

  constructor(action: () => void, pollId: string) {
    this.socket = io(`${PROTOCOL}://${URL}:${PORT}`);
    this.action = action;
    this.pollId = pollId;
    this.connectionInit();
  }

  connectionInit() {
    this.socket
      .on(SOCKET_EVENTS.CONNECT_SUCCESS, (data: any) => {
        console.log('data', data);
      })
      .on(SOCKET_EVENTS.VOTE_ADDED, (data: ISocketData) => {
        if (data.pollId === this.pollId) {
          this.action();
        }
      });
  }

  addVote() {
    this.socket.emit(SOCKET_EVENTS.ADD_VOTE, { pollId: this.pollId });
  }

  disconnection() {
    this.socket.disconnect();
  }
}
