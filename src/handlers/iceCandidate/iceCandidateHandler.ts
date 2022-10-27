import Channels from '../../common/enums/Channels';
import { logBrokerServer as log } from '../../common/util/log';
import Connection from '../../common/connectionsHub/Connection';
import InvokingEndpointHub from '../../brokerServer/invokingEndpoints/InvokingEndpointsHub';
import Roles from '../../common/enums/Roles';
import NodesHub from '../../brokerServer/nodes/NodesHub';
import IceCandidatePayload from './IceCandidatePayload';

export default function iceCandidateHandler(connection: Connection) {
  connection.socket.on(Channels.ICE_CANDIDATE, function (payload) {
    try {
      const iceCandidatePayload = new IceCandidatePayload(payload);
      if (iceCandidatePayload.fromId === connection.id) {
        let receiver: Connection | undefined = undefined;
        if (iceCandidatePayload.receiverRole === Roles.NODE) {
          receiver = NodesHub.connections.get(iceCandidatePayload.toId);
        } else {
          receiver = InvokingEndpointHub.connections.get(
            iceCandidatePayload.toId
          );
        }
        if (receiver !== undefined) {
          log(
            'forwar ' +
              Channels.ICE_CANDIDATE +
              ' from ' +
              connection.id +
              ' to ' +
              iceCandidatePayload.receiverRole +
              ' ' +
              iceCandidatePayload.toId
          );
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
  log(connection.id + ' ' + Channels.ICE_CANDIDATE + ' ERROR');
}
