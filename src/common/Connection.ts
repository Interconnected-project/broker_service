import { Socket } from 'socket.io';

export default class Connection {
  private _id: string;
  private _socket: Socket;
  private _role: string;

  constructor(id: string, role: string, socket: Socket) {
    this._id = id;
    this._role = role;
    this._socket = socket;
  }

  get id(): string {
    return this._id;
  }

  get socket(): Socket {
    return this._socket;
  }

  get role(): string {
    return this._role;
  }
}
