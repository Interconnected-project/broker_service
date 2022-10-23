import { createServer } from 'http';
import { ParsedUrlQuery } from 'querystring';
import { Server, Socket } from 'socket.io';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const p2p = require('socket.io-p2p-server').Server;
import Roles from './common/Roles';
import Rooms from './common/Rooms';
import { joinRoom } from './common/serverOperations';
import { logServer as log } from './common/util/log';

export default class SocketServer {
  private httpServer = createServer();
  private server = new Server(this.httpServer, {
    cors: {
      origin: '*',
      methods: '*',
    },
  });

  constructor(
    applyNodeHandlers: (server: Server, socket: Socket, id: string) => void,
    applyInvokingEndpointHandlers: (
      server: Server,
      socket: Socket,
      id: string
    ) => void
  ) {
    this.server.use(p2p);
    this.server.on('connection', (socket) => {
      const query = socket.handshake.query;
      try {
        const id = this.getId(query);
        const role = this.getRole(query);
        if (role === Roles.NODE) {
          applyNodeHandlers(this.server, socket, id);
          joinRoom(socket, Rooms.NODES);
        } else {
          applyInvokingEndpointHandlers(this.server, socket, id);
          joinRoom(socket, Rooms.INVOKING_ENDPOINTS);
        }
        log(role + ' connected: ' + id);

        socket.on('disconnecting', () => {
          log(role + ' disconnected: ' + id);
        });
      } catch {
        log('Connection refused: wrong query parameters');
        socket.disconnect();
      }
    });
  }

  private getId(query: ParsedUrlQuery): string {
    if (query.id === undefined || Array.isArray(query.id)) {
      throw new Error();
    }
    return query.id;
  }

  private getRole(query: ParsedUrlQuery): string {
    const role = query.role;
    if (
      role === undefined ||
      Array.isArray(role) ||
      (role !== 'NODE' && role !== 'INVOKING_ENDPOINT')
    ) {
      throw new Error();
    }
    return role;
  }

  start(port: number) {
    this.httpServer.listen(port);
    log('started on port ' + port);
  }
}
