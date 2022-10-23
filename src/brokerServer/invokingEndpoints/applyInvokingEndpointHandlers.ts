import { Server, Socket } from 'socket.io';

import recruitment from './handlers/recruitment';

export default function applyInvokingEndpointHandlers(
  server: Server,
  socket: Socket,
  id: string
) {
  recruitment(server, socket, id);
}
