import { Server } from 'socket.io';
import Connection from '../../common/connectionsHub/Connection';
import initializeConnectionHandler from './handlers/initializeConnection/initializeConnectionHandler';

import recruitmentRequestHandler from './handlers/recruitmentRequest/recruitmentRequestHandler';

export default function applyInvokingEndpointHandlers(
  server: Server,
  connection: Connection
) {
  recruitmentRequestHandler(server, connection);
  initializeConnectionHandler(connection);
}
