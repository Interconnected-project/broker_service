import { Server, Socket } from 'socket.io';
import Channels from '../../common/Channels';
import { broadcast, joinRoom } from '../../common/serverOperations';

export default function joinChannelHandler(
  server: Server,
  socket: Socket,
  id: string
) {
  socket.on(Channels.JOIN, function (payload) {
    joinRoom(socket, payload.query.roomId);
    broadcast(server, payload.query.roomId, 'private', 'payload');
    console.log('join');
  });
}
