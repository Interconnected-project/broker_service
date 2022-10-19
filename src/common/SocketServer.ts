import { Server, Socket } from 'socket.io';

import Connection from './Connection';
import ConnectionsHub from './ConnectionsHub';
import log from './util/log';

export default class SocketServer {
  private server = new Server({
    /* options */
  });

  private hub: ConnectionsHub = new ConnectionsHub();

  constructor(private name: string, applyHandlers: (socket: Socket) => void) {
    this.server.on('connection', (socket) => {
      let connection: Connection | undefined = undefined;
      const mac = socket.handshake.query.mac;
      if (mac === undefined || Array.isArray(mac)) {
        log(name, 'new connection discaretd: no mac provided');
        socket.disconnect();
      } else {
        connection = new Connection(mac, socket);
        if (this.hub.add(connection)) {
          log(name, 'new connection: ' + connection.id);
          applyHandlers(socket);
        } else {
          log(
            name,
            'new connection discaretd: duplicate(' + connection.id + ')'
          );
          socket.disconnect();
        }
      }

      socket.on('disconnecting', () => {
        if (connection !== undefined && this.hub.remove(connection.id)) {
          log(name, 'disconnected: ' + connection.id);
          connection = undefined;
        }
      });
    });
  }

  start(port: number) {
    this.server.listen(port);
    log(this.name, 'started on port ' + port);
  }
}
