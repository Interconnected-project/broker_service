import { Socket } from 'socket.io';
import Channels from '../common/Channels';
import Connection from '../common/Connection';
import { logNodes as log } from '../common/util/log';

export default function applyNodesHandlers(
  socket: Socket,
  connection: Connection
) {
  socket.on(Channels.TEST, function () {
    log(Channels.TEST + ' (' + connection.id + ')');
    socket.emit(Channels.TEST, 'ack');
  });
}
