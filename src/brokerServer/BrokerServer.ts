import { createServer } from 'http';
import { ParsedUrlQuery } from 'querystring';
import { Server } from 'socket.io';

import Roles from '../common/enums/Roles';
import Rooms from '../common/enums/Rooms';
import { logBrokerServer as log } from '../common/util/log';
import applyInvokingEndpointHandlers from './invokingEndpoints/applyInvokingEndpointHandlers';
import joinRoom from '../common/joinRoom';
import applyNodeHandlers from './nodes/applyNodeHandlers';
import RecruitmentRequestBulletinBoard from './RecruitmentRequestsBulletinBoard';
import Channels from '../common/enums/Channels';
import Connection from '../common/connectionsHub/Connection';
import InvokingEndpointHub from './invokingEndpoints/InvokingEndpointsHub';
import NodesHub from './nodes/NodesHub';

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
        const connection = new Connection(this.getId(query), socket);
        const role = this.getRole(query);
        if (role === Roles.NODE) {
          applyNodeHandlers(connection);
          joinRoom(socket, Rooms.NODES);
          NodesHub.connections.add(connection);
          RecruitmentRequestBulletinBoard.pendingRequestsPayload.forEach((p) =>
            socket.emit(Channels.RECRUITMENT_BROADCAST, p)
          );
        } else {
          applyInvokingEndpointHandlers(this.server, connection);
          joinRoom(socket, Rooms.INVOKING_ENDPOINTS);
          InvokingEndpointHub.connections.add(connection);
        }
        log(role + ' connected: ' + connection.id);

        socket.on('disconnecting', () => {
          if (role === Roles.NODE) {
            NodesHub.connections.remove(connection.id);
          } else {
            InvokingEndpointHub.connections.remove(connection.id);
            RecruitmentRequestBulletinBoard.revokeRequests(connection.id);
          }
          log(role + ' disconnected: ' + connection.id);
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
