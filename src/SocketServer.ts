import { createServer } from 'http';
import { ParsedUrlQuery } from 'querystring';
import { Server, Socket } from 'socket.io';
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
    this.server.on('connection', (socket) => {
      const query = socket.handshake.query;
      try {
        const id = this.getId(query);
        const role = this.getRole(query);
        if (role === 'NODE') {
          applyNodeHandlers(this.server, socket, id);
          socket.join('NODES');
          log('Node connected: ' + id);
        } else {
          applyInvokingEndpointHandlers(this.server, socket, id);
          socket.join('INVOKING_ENDPOINTS');
          log('Invoking Endpoint connected: ' + id);
        }
        socket.on('disconnecting', () => {
          if (role === 'NODE') {
            log('Node disconnected: ' + id);
          } else {
            log('Invoking Endpoint disconnected: ' + id);
          }
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
