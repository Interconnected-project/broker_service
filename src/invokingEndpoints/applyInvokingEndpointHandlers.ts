import { Socket, Server } from 'socket.io';

import mapReduceServiceMasterRecruitment from './handlers/recruitment';

export default function applyInvokingEndpointHandlers(
  server: Server,
  socket: Socket,
  id: string
) {
  mapReduceServiceMasterRecruitment(server, socket, id);
}
