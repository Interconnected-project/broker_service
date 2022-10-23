import { Server } from 'socket.io';
import Connection from '../Connection';
import ConnectionsHub from '../../common/connectionsHub/ConnectionsHub';
import connectionAccept from './handlers/connectionAccept';

import recruitmentRequestHandler from './handlers/recruitmentRequest/recruitmentRequestHandler';

export default function applyInvokingEndpointHandlers(
  server: Server,
  connection: Connection,
  nodes: ConnectionsHub
) {
  recruitmentRequestHandler(server, connection);
  connectionAccept(connection, nodes);
}
