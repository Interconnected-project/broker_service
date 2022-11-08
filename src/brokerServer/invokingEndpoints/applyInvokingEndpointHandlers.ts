import { Server } from 'socket.io';
import Connection from '../../common/connectionsHub/Connection';
import iceCandidateHandler from '../../handlers/iceCandidateHandler';
import requestConnectionHandler from '../../handlers/requestConnectionHandler';
import recruitmentRequestHandler from '../../handlers/recruitmentRequestHandler';
import statusHandler from '../../handlers/statusHandler';

export default function applyInvokingEndpointHandlers(
  server: Server,
  connection: Connection
) {
  recruitmentRequestHandler(server, connection);
  requestConnectionHandler(connection);
  iceCandidateHandler(connection);
  statusHandler(connection);
}
