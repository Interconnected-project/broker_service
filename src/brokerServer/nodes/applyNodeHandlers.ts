import Connection from '../../common/connectionsHub/Connection';
import ConnectionsHub from '../../common/connectionsHub/ConnectionsHub';

import recruitmentAcceptHandler from './handlers/recruitmentAccept/recruitmentAcceptHandler';

export default function applyNodeHandlers(
  connection: Connection,
  invokingEndpoints: ConnectionsHub
) {
  recruitmentAcceptHandler(connection);
}
