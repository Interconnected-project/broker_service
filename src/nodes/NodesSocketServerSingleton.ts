import { Socket } from 'socket.io';

import SocketServer from '../common/SocketServer';
import Connection from '../common/Connection';

export const LOG_TAG = 'Nodes';

export default class NodesSocketServerSingleton {
  private static instance: NodesSocketServerSingleton | undefined = undefined;
  private _server: SocketServer;

  private constructor() {
    this._server = new SocketServer(LOG_TAG, applyHandlers);
  }

  static get server(): SocketServer {
    if (NodesSocketServerSingleton.instance === undefined) {
      NodesSocketServerSingleton.instance = new NodesSocketServerSingleton();
    }
    return NodesSocketServerSingleton.instance._server;
  }
}

function applyHandlers(socket: Socket, connection: Connection) {
  socket.on('star wars', function (from, msg) {
    console.log(from + ': ' + msg);
    socket.emit('star wars', 'Grievous', 'General Kenobi');
  });
}
