import Channels from '../common/enums/Channels';
import Connection from '../common/connectionsHub/Connection';
import NodesHub from '../brokerServer/nodes/NodesHub';

export default function requestConnectionHandler(connection: Connection) {
  connection.socket.on(Channels.REQUEST_CONNECTION, function (payload) {
    try {
      if (connection.id === payload.masterId) {
        const slave = NodesHub.connections.get(payload.slaveId);
        if (slave !== undefined) {
          slave.socket.emit(Channels.REQUEST_CONNECTION, payload);
          return;
        }
      }
      onError(connection);
    } catch {
      onError(connection);
    }
  });
}

function onError(connection: Connection): void {
  connection.socket.emit(Channels.REQUEST_CONNECTION, 'ERROR');
}
