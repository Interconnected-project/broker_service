import { Server, Socket } from 'socket.io';
import Connection from '../common/Connection';
import ConnectionsHub from './ConnectionsHub';

export default function createServer(
  name: string,
  port: number,
  hub: ConnectionsHub,
  applyHandlers: (socket: Socket) => void
) {
  const server = new Server({
    /* options */
  });

  server.on('connection', (socket) => {
    let connection: Connection | undefined = undefined;
    const mac = socket.handshake.query.mac;
    if (mac === undefined || Array.isArray(mac)) {
      log(name, 'new connection discaretd: no mac provided');
      socket.disconnect();
    } else {
      connection = new Connection(mac, socket);
      if (hub.add(connection)) {
        log(name, 'new connection: ' + connection.id);
        applyHandlers(socket);
      } else {
        log(name, 'new connection discaretd: duplicate(' + connection.id + ')');
        socket.disconnect();
      }
    }

    socket.on('disconnecting', () => {
      if (connection !== undefined && hub.remove(connection.id)) {
        log(name, 'disconnected: ' + connection.id);
        connection = undefined;
      }
    });
  });

  server.listen(port);
  log(name, 'started on port ' + port);
}

function log(name: string, msg: string) {
  console.log('[' + name + '] ' + msg);
}
