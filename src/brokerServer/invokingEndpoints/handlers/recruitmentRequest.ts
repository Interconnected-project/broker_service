import { Server } from 'socket.io';
import { logInvokingEndpoint as log } from '../../../common/util/log';
import { broadcast } from '../../BrokerServer';
import Channels from '../../Channels';
import Connection from '../../Connection';
import Rooms from '../../Rooms';

export default function recruitmentRequest(
  server: Server,
  connection: Connection
) {
  connection.socket.on(Channels.RECRUITMENT_REQUEST, function (payload) {
    broadcast(server, Rooms.NODES, Channels.RECRUITMENT_BROADCAST, payload);
    logSuccess(connection.id);
  });
}

function logSuccess(invokingEndpointId: string): void {
  log(
    invokingEndpointId,
    'accepted ' +
      Channels.RECRUITMENT_REQUEST +
      '; sent ' +
      Channels.RECRUITMENT_BROADCAST
  );
}
