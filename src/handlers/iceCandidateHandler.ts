import Channels from '../common/enums/Channels';
import Connection from '../common/connectionsHub/Connection';
import InvokingEndpointHub from '../brokerServer/invokingEndpoints/InvokingEndpointsHub';
import Roles from '../common/enums/Roles';
import NodesHub from '../brokerServer/nodes/NodesHub';

export default function iceCandidateHandler(connection: Connection) {
  connection.socket.on(Channels.ICE_CANDIDATE, function (payload) {
    try {
      if (payload.fromId === connection.id) {
        let receiver: Connection | undefined = undefined;
        if (payload.toRole === Roles.NODE) {
          receiver = NodesHub.connections.get(payload.toId);
        } else {
          receiver = InvokingEndpointHub.connections.get(payload.toId);
        }
        if (receiver !== undefined) {
          receiver.socket.emit(Channels.ICE_CANDIDATE, payload);
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
  connection.socket.emit(Channels.ICE_CANDIDATE, 'ERROR');
}
