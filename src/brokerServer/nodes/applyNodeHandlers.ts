import Connection from '../../common/connectionsHub/Connection';
import answerConnectionHandler from '../../handlers/answerConnection/answerConnectionHandler';
import initializeConnectionHandler from '../../handlers/initializeConnection/initializeConnectionHandler';
import recruitmentAcceptHandler from '../../handlers/recruitmentAccept/recruitmentAcceptHandler';

export default function applyNodeHandlers(connection: Connection) {
  recruitmentAcceptHandler(connection);
  answerConnectionHandler(connection);
  initializeConnectionHandler(connection);
}
