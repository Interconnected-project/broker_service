import { logInvokingEndpoint as log } from '../../../common/util/log';
import Channels from '../../../common/enums/Channels';
import ConnectionsHub from '../../../common/connectionsHub/ConnectionsHub';
import Connection from '../../../common/connectionsHub/Connection';

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
