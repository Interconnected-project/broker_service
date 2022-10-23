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
    log(
      connection.id,
      Channels.RECRUITMENT_REQUEST,
      'broadcasting ' + Channels.RECRUITMENT_BROADCAST + ' to Nodes'
    );
  });
}
