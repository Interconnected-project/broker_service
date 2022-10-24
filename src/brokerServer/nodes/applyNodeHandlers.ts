import Connection from '../../common/connectionsHub/Connection';
import answerConnectionHandler from './handlers/answerConnectionHandler.ts/answerConnectionHandler';
import recruitmentAcceptHandler from './handlers/recruitmentAccept/recruitmentAcceptHandler';

export default function applyNodeHandlers(connection: Connection) {
  recruitmentAcceptHandler(connection);
  answerConnectionHandler(connection);
}
