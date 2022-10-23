import { logInvokingEndpoint as log } from '../../../common/util/log';
import Channels from '../../../common/enums/Channels';
import Connection from '../../../common/connectionsHub/Connection';
import NodesHub from '../../nodes/NodesHub';

export default function connectionAccept(connection: Connection) {
  connection.socket.on(Channels.CONNECTION_ACCEPT, function (payload) {
    const node = NodesHub.connections.get(payload.nodeId);
    if (node !== undefined) {
      node.socket.emit(Channels.COMPLETE_CONNECTION, payload);
      //TODO log
    }
  });
}
