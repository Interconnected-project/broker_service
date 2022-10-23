import { Server } from 'socket.io';
import Connection from '../Connection';
import ConnectionsHub from '../ConnectionsHub';
import connectionAccept from './handlers/connectionAccept';

import recruitmentRequest from './handlers/recruitmentRequest';

export default function applyInvokingEndpointHandlers(
  server: Server,
  connection: Connection,
  nodes: ConnectionsHub
) {
  recruitmentRequest(server, connection);
  connectionAccept(connection, nodes);
}
