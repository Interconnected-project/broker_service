import { Socket } from 'socket.io';
import Connection from '../../common/Connection';
import NodesSocketServerSingleton from '../../nodes/NodesSocketServerSingleton';

import { logInvokingEndpoints as log } from '../../common/util/log';
import Channels from '../../common/Channels';

export default function recruitment(socket: Socket, connection: Connection) {
  socket.on(Channels.RECRUITMENT, function (payload) {
    log('Recruitment request (' + connection.id + ')\n' + payload);
    NodesSocketServerSingleton.server.broadcastMsg(
      Channels.RECRUITMENT,
      payload
    );
  });
}
