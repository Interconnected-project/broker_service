import { Socket } from 'socket.io';

export default class Connection {
  private _id: string;
  private _socket: Socket;

  constructor(id: string, socket: Socket) {
    this._id = id;
    this._socket = socket;
  }

  get id(): string {
    return this._id;
  }

  get socket(): Socket {
    return this._socket;
  }
}
