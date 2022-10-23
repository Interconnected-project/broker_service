import { Server, Socket } from 'socket.io';
import { logInvokingEndpoint as log } from '../../../common/util/log';
import { broadcast } from '../../BrokerServer';
import Channels from '../../Channels';
import Rooms from '../../Rooms';

export default function recruitment(
  server: Server,
  socket: Socket,
  id: string
) {
  socket.on(Channels.RECRUITMENT_REQUEST, function (payload) {
    const roomId = generateRoomId(id);
    socket.emit(Channels.RECRUITMENT_REQUEST, roomId);
    const parsedPayload = JSON.parse(payload);
    parsedPayload.roomId = roomId;
    broadcast(
      server,
      Rooms.NODES,
      Channels.RECRUITMENT_BROADCAST,
      parsedPayload
    );
    logSuccess(id, parsedPayload);
  });
}

function generateRoomId(invokingEndpointId: string): string {
  return invokingEndpointId + '-' + Date.now();
}

function logSuccess(invokingEndpointId: string, payload: unknown): void {
  log(
    invokingEndpointId,
    'accepted ' +
      Channels.RECRUITMENT_REQUEST +
      '; sent ' +
      Channels.RECRUITMENT_BROADCAST +
      '\n' +
      JSON.stringify(payload, null, 2)
  );
}
