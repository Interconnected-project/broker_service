import { Server, Socket } from 'socket.io';
import joinChannelHandler from './handlers.ts/joinChannelHandler';

export default function applyInvokingEndpointHandlers(
  server: Server,
  socket: Socket,
  id: string
) {
  joinChannelHandler(server, socket, id);
}
