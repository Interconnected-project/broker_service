import Connection from '../../common/connectionsHub/Connection';
import recruitmentAcceptHandler from './handlers/recruitmentAccept/recruitmentAcceptHandler';

export default function applyNodeHandlers(connection: Connection) {
  recruitmentAcceptHandler(connection);
}
