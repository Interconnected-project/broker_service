import { createServer } from 'http';
import { ParsedUrlQuery } from 'querystring';
import { Server, Socket } from 'socket.io';

import Roles from './Roles';
import Rooms from './Rooms';
import { logServer as log } from '../common/util/log';
import applyInvokingEndpointHandlers from './invokingEndpoints/applyInvokingEndpointHandlers';

export default class BrokerServer {
  private httpServer = createServer();
  private server = new Server(this.httpServer, {
    cors: {
      origin: '*',
      methods: '*',
    },
  });

  constructor() {
    this.server.on('connection', (socket) => {
      const query = socket.handshake.query;
      try {
        const id = this.getId(query);
        const role = this.getRole(query);
        if (role === Roles.NODE) {
          this.joinRoom(socket, Rooms.NODES);
        } else {
          applyInvokingEndpointHandlers(this.server, socket, id);
          this.joinRoom(socket, Rooms.INVOKING_ENDPOINTS);
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

  private joinRoom(socket: Socket, roomId: string): void {
    socket.join(roomId);
  }

  start(port: number) {
    this.httpServer.listen(port);
    log('started on port ' + port);
  }
}

export function broadcast(
  server: Server,
  roomId: string,
  channel: string,
  payload: unknown
): void {
  server.sockets.to(roomId).emit(channel, payload, {
    receivers: 'everyone',
  });
}
