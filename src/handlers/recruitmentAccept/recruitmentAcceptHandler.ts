import { logNode as log } from '../../common/util/log';
import RecruitmentRequestBulletinBoard from '../../brokerServer/RecruitmentRequestsBulletinBoard';
import Connection from '../../common/connectionsHub/Connection';
import Channels from '../../common/enums/Channels';
import RecruitmentAcceptPayload from './RecruitmentAcceptPayload';
import Roles from '../../common/enums/Roles';
import InvokingEndpointHub from '../../brokerServer/invokingEndpoints/InvokingEndpointsHub';
import NodesHub from '../../brokerServer/nodes/NodesHub';

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
        if (recruitmentRequest !== undefined) {
          var initiator: Connection | undefined = undefined;
          if (recruitmentRequest.initiatorRole === Roles.INVOKING_ENDPOINT) {
            initiator = InvokingEndpointHub.connections.get(
              recruitmentRequest.initiatorId
            );
          } else {
            initiator = NodesHub.connections.get(
              recruitmentRequest.initiatorId
            );
          }
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
          } else {
            onError(connection);
          }
        } else {
          onAlreadyFulfilled(connection);
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
  log(connection.id, Channels.RECRUITMENT_ACCEPT, 'ERROR');
}

function onAlreadyFulfilled(connection: Connection): void {
  log(connection.id, Channels.RECRUITMENT_ACCEPT, 'already fulfilled');
}
