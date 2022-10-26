import { Server } from 'socket.io';

import { logInvokingEndpoint as log } from '../../common/util/log';
import { broadcast } from '../../brokerServer/BrokerServer';
import Channels from '../../common/enums/Channels';
import RecruitmentRequest from '../../brokerServer/RecruitmentRequest';
import RecruitmentRequestBulletinBoard from '../../brokerServer/RecruitmentRequestsBulletinBoard';
import Rooms from '../../common/enums/Rooms';
import RecruitmentRequestPayload from './RecruitmentRequestPayload';
import Connection from '../../common/connectionsHub/Connection';

export default function recruitmentRequestHandler(
  server: Server,
  connection: Connection
) {
  connection.socket.on(Channels.RECRUITMENT_REQUEST, function (payload) {
    try {
      const recruitmentRequest = buildRecruitingRequest(payload, connection);
      if (RecruitmentRequestBulletinBoard.publishRequest(recruitmentRequest)) {
        log(
          connection.id,
          Channels.RECRUITMENT_REQUEST,
          'broadcasting ' + Channels.RECRUITMENT_BROADCAST + ' to Nodes'
        );
        broadcast(server, Rooms.NODES, Channels.RECRUITMENT_BROADCAST, payload);
      } else {
        onError(connection);
      }
    } catch {
      onError(connection);
    }
  });
}

function buildRecruitingRequest(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
  connection: Connection
): RecruitmentRequest {
  const recruitmentRequestPayload = new RecruitmentRequestPayload(payload);
  const recruitmentRequest = new RecruitmentRequest(
    recruitmentRequestPayload.invokingEndpointId,
    recruitmentRequestPayload.operationId,
    recruitmentRequestPayload.initiatorId,
    recruitmentRequestPayload.initiatorRole,
    recruitmentRequestPayload.nodesToReach,
    payload
  );
  if (connection.id !== recruitmentRequest.invokingEndpointId) {
    throw new Error();
  }
  return recruitmentRequest;
}

function onError(connection: Connection): void {
  connection.socket.emit(Channels.RECRUITMENT_REQUEST, 'ERROR');
  log(connection.id, Channels.RECRUITMENT_REQUEST, 'ERROR');
}
