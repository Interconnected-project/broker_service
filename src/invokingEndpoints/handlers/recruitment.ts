import { Socket, Server } from 'socket.io';
import { logInvokingEndpoint as log } from '../../common/util/log';
import Channels from '../../common/Channels';

export default function recruitment(
  server: Server,
  socket: Socket,
  id: string
) {
  socket.on(Channels.RECRUITMENT, function (payload) {
    log(id, 'Recruitment request\n' + payload);
    if (payload === undefined || payload === null) {
      log(id, 'No payload, did not broadcast recruitment request');
    } else {
      server.sockets
        .to('NODES')
        .emit(Channels.RECRUITMENT, payload, { receivers: 'everyone' });
    }
  });
}
