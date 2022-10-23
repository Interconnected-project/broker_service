import { Server } from 'socket.io';
import Connection from '../../common/connectionsHub/Connection';
import connectionAccept from './handlers/connectionAccept';

import recruitmentRequestHandler from './handlers/recruitmentRequest/recruitmentRequestHandler';

export default function applyInvokingEndpointHandlers(
  server: Server,
  connection: Connection
) {
  recruitmentRequestHandler(server, connection);
  connectionAccept(connection);
}
