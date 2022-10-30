import RecruitmentRequestBulletinBoard from '../brokerServer/RecruitmentRequestsBulletinBoard';
import Connection from '../common/connectionsHub/Connection';
import Channels from '../common/enums/Channels';
import Roles from '../common/enums/Roles';
import InvokingEndpointHub from '../brokerServer/invokingEndpoints/InvokingEndpointsHub';
import NodesHub from '../brokerServer/nodes/NodesHub';

export default function recruitmentAcceptHandler(connection: Connection) {
  connection.socket.on(Channels.RECRUITMENT_ACCEPT, function (payload) {
    try {
      if (connection.id === payload.slaveId) {
        const recruitmentRequest =
          RecruitmentRequestBulletinBoard.acceptRequest(
            payload.operationId,
            payload.masterId,
            payload.masterRole
          );
        if (recruitmentRequest !== undefined) {
          let initiator: Connection | undefined = undefined;
          if (payload.masterRole === Roles.INVOKING_ENDPOINT) {
            initiator = InvokingEndpointHub.connections.get(payload.masterId);
          } else {
            initiator = NodesHub.connections.get(payload.masterId);
          }
          if (initiator !== undefined) {
            initiator.socket.emit(Channels.RECRUITMENT_ACCEPT, payload);
          } else {
            onError(connection);
          }
        }
      } else {
        onError(connection);
      }
    } catch {
      onError(connection);
    }
  });
}

function onError(connection: Connection): void {
  connection.socket.emit(Channels.RECRUITMENT_ACCEPT, 'ERROR');
}
