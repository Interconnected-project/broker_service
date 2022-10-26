import { logNode as log } from '../../common/util/log';
import RecruitmentRequestBulletinBoard from '../../brokerServer/RecruitmentRequestsBulletinBoard';
import Connection from '../../common/connectionsHub/Connection';
import Channels from '../../common/enums/Channels';
import RecruitmentAcceptPayload from './RecruitmentAcceptPayload';

export default function recruitmentAcceptHandler(connection: Connection) {
  connection.socket.on(Channels.RECRUITMENT_ACCEPT, function (payload) {
    try {
      const recruitmentAcceptPayload = new RecruitmentAcceptPayload(payload);
      const recruitmentRequest = RecruitmentRequestBulletinBoard.acceptRequest(
        recruitmentAcceptPayload.invokingEndpointId,
        recruitmentAcceptPayload.operationId
      );
      if (recruitmentRequest !== undefined) {
        recruitmentRequest.socket.emit(Channels.OFFER_NODE, payload);
        log(
          connection.id,
          Channels.RECRUITMENT_ACCEPT,
          'send ' +
            Channels.OFFER_NODE +
            ' to Invoking Endpoint ' +
            recruitmentAcceptPayload.invokingEndpointId
        );
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