import { logInvokingEndpoint as log } from '../../common/util/log';
import Channels from '../../common/enums/Channels';
import Connection from '../../common/connectionsHub/Connection';
import NodesHub from '../../brokerServer/nodes/NodesHub';
import InitializeConnectionPayload from './InitializeConnectionPayload';

export default function initializeConnectionHandler(connection: Connection) {
  connection.socket.on(Channels.INITIALIZE_CONNECTION, function (payload) {
    try {
      const initializeConnectionPayload = new InitializeConnectionPayload(
        payload
      );
      const node = NodesHub.connections.get(initializeConnectionPayload.nodeId);
      if (node !== undefined) {
        log(
          connection.id,
          Channels.INITIALIZE_CONNECTION,
          'sending ' + Channels.INCOMING_CONNECTION + ' to Node ' + node.id
        );
        node.socket.emit(Channels.INCOMING_CONNECTION, payload);
      } else {
        onError(connection);
      }
    } catch {
      onError(connection);
    }
  });
}

function onError(connection: Connection): void {
  connection.socket.emit(Channels.INITIALIZE_CONNECTION, 'ERROR');
  log(connection.id, Channels.INITIALIZE_CONNECTION, 'ERROR');
}
