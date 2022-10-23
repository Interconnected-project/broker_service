import Connection from '../Connection';
import ConnectionsHub from '../ConnectionsHub';

import recruitmentAccept from './handlers/recruitmentAccept';

export default function applyNodeHandlers(
  connection: Connection,
  invokingEndpoints: ConnectionsHub
) {
  recruitmentAccept(connection, invokingEndpoints);
}
