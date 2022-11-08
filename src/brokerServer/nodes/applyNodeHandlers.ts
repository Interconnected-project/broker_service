import Connection from '../../common/connectionsHub/Connection';
import answerConnectionHandler from '../../handlers/answerConnectionHandler';
import iceCandidateHandler from '../../handlers/iceCandidateHandler';
import requestConnectionHandler from '../../handlers/requestConnectionHandler';
import recruitmentAcceptHandler from '../../handlers/recruitmentAcceptHandler';
import recruitmentRequestHandler from '../../handlers/recruitmentRequestHandler';
import { Server } from 'socket.io';
import statusHandler from '../../handlers/statusHandler';

export default function applyNodeHandlers(
  server: Server,
  connection: Connection
) {
  recruitmentRequestHandler(server, connection);
  recruitmentAcceptHandler(connection);
  requestConnectionHandler(connection);
  answerConnectionHandler(connection);
  iceCandidateHandler(connection);
  statusHandler(connection);
}
