import { logNode as log } from '../../common/util/log';
import RecruitmentRequestBulletinBoard from '../../brokerServer/RecruitmentRequestsBulletinBoard';
import Connection from '../../common/connectionsHub/Connection';
import Channels from '../../common/enums/Channels';
import RecruitmentAcceptPayload from './RecruitmentAcceptPayload';
import Roles from '../../common/enums/Roles';
import InvokingEndpointHub from '../../brokerServer/invokingEndpoints/InvokingEndpointsHub';
import NodesHub from '../../brokerServer/nodes/NodesHub';
import RecruitmentRequest from '../../brokerServer/RecruitmentRequest';

export default function recruitmentAcceptHandler(connection: Connection) {
  connection.socket.on(Channels.RECRUITMENT_ACCEPT, function (payload) {
    try {
      const recruitmentAcceptPayload = new RecruitmentAcceptPayload(payload);
      if (connection.id === recruitmentAcceptPayload.answererId) {
        const recruitmentRequest =
          RecruitmentRequestBulletinBoard.acceptRequest(
            recruitmentAcceptPayload.invokingEndpointId,
            recruitmentAcceptPayload.operationId,
            recruitmentAcceptPayload.initiatorId,
            recruitmentAcceptPayload.initiatorRole
          );
        var initiator: Connection | undefined =
          getInitiator(recruitmentRequest);
        if (initiator !== undefined) {
          initiator.socket.emit(Channels.OFFER_NODE, payload);
          log(
            connection.id,
            Channels.RECRUITMENT_ACCEPT,
            'send ' +
              Channels.OFFER_NODE +
              ' to ' +
              recruitmentAcceptPayload.initiatorRole +
              ' ' +
              recruitmentAcceptPayload.invokingEndpointId
          );
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
  connection.socket.emit(Channels.RECRUITMENT_ACCEPT, 'ERROR');
  log(connection.id, Channels.RECRUITMENT_ACCEPT, 'ERROR');
}

function getInitiator(
  recruitmentRequest: RecruitmentRequest | undefined
): Connection | undefined {
  if (recruitmentRequest === undefined) {
    return undefined;
  }
  if (recruitmentRequest.initiatorRole === Roles.INVOKING_ENDPOINT) {
    return InvokingEndpointHub.connections.get(recruitmentRequest.initiatorId);
  } else {
    return NodesHub.connections.get(recruitmentRequest.initiatorId);
  }
}
