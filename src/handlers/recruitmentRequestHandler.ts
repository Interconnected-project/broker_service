import { Server } from 'socket.io';

import { broadcast } from '../brokerServer/BrokerServer';
import Channels from '../common/enums/Channels';
import RecruitmentRequest from '../brokerServer/RecruitmentRequest';
import RecruitmentRequestBulletinBoard from '../brokerServer/RecruitmentRequestsBulletinBoard';
import Rooms from '../common/enums/Rooms';
import Connection from '../common/connectionsHub/Connection';

export default function recruitmentRequestHandler(
  server: Server,
  connection: Connection
) {
  connection.socket.on(Channels.RECRUITMENT_REQUEST, function (payload) {
    try {
      const recruitmentRequest = new RecruitmentRequest(
        payload.operationId,
        payload.masterId,
        payload.masterRole,
        payload.nodesToReach,
        payload
      );
      if (RecruitmentRequestBulletinBoard.publishRequest(recruitmentRequest)) {
        broadcast(server, Rooms.NODES, Channels.RECRUITMENT_BROADCAST, payload);
      } else {
        connection.socket.emit(Channels.RECRUITMENT_REQUEST, 'ERROR');
      }
    } catch {
      connection.socket.emit(Channels.RECRUITMENT_REQUEST, 'ERROR');
    }
  });
}
