import { logInvokingEndpoint as log } from '../../../common/util/log';
import Channels from '../../../common/enums/Channels';
import Connection from '../../Connection';
import ConnectionsHub from '../../../common/connectionsHub/ConnectionsHub';

export default function connectionAccept(
  connection: Connection,
  nodes: ConnectionsHub
) {
  connection.socket.on(Channels.CONNECTION_ACCEPT, function (payload) {
    const node = nodes.get(payload.nodeId);
    if (node !== undefined) {
      node.socket.emit(Channels.COMPLETE_CONNECTION, payload);
      //TODO log
    }
  });
}
