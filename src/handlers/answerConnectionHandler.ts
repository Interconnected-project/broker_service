import Channels from '../common/enums/Channels';
import Connection from '../common/connectionsHub/Connection';
import InvokingEndpointHub from '../brokerServer/invokingEndpoints/InvokingEndpointsHub';
import Roles from '../common/enums/Roles';
import NodesHub from '../brokerServer/nodes/NodesHub';

export default function answerConnectionHandler(connection: Connection) {
  connection.socket.on(Channels.ANSWER_CONNECTION, function (payload) {
    try {
      if (connection.id === payload.slaveId) {
        let master: Connection | undefined = undefined;
        if (payload.masterRole === Roles.NODE) {
          master = NodesHub.connections.get(payload.masterId);
        } else {
          master = InvokingEndpointHub.connections.get(payload.masterId);
        }
        if (master !== undefined) {
          master.socket.emit(Channels.ANSWER_CONNECTION, payload);
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
  connection.socket.emit(Channels.ANSWER_CONNECTION, 'ERROR');
}
