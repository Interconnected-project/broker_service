import Connection from '../Connection';
import ConnectionsHub from '../ConnectionsHub';

import recruitmentAcceptHandler from './handlers/recruitmentAccept/recruitmentAcceptHandler';

export default function applyNodeHandlers(
  connection: Connection,
  invokingEndpoints: ConnectionsHub
) {
  recruitmentAcceptHandler(connection);
}
