import InvokingEndpointHub from '../brokerServer/invokingEndpoints/InvokingEndpointsHub';
import NodesHub from '../brokerServer/nodes/NodesHub';
import RecruitmentRequestBulletinBoard from '../brokerServer/RecruitmentRequestsBulletinBoard';
import Connection from '../common/connectionsHub/Connection';
import Channels from '../common/enums/Channels';

export default function statusHandler(connection: Connection) {
  connection.socket.on(Channels.STATUS, function () {
    const payload = {
      nodes: NodesHub.connections.list,
      invokingEndpoints: InvokingEndpointHub.connections.list,
      recruitmentRequests:
        RecruitmentRequestBulletinBoard.pendingRequestsPayload,
    };
    connection.socket.emit(Channels.STATUS, payload);
  });
}
