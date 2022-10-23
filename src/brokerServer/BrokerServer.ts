import { createServer } from 'http';
import { ParsedUrlQuery } from 'querystring';
import { Server } from 'socket.io';

import Roles from '../common/Roles';
import Rooms from './Rooms';
import { logBrokerServer as log } from '../common/util/log';
import applyInvokingEndpointHandlers from './invokingEndpoints/applyInvokingEndpointHandlers';
import joinRoom from '../common/joinRoom';

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
