import { Socket, Server } from 'socket.io';
import { logInvokingEndpoint as log } from '../../common/util/log';
import Channels from '../../common/Channels';
import {
  RecruitmentBroadcastPayload,
  RecruitmentRequestPayload,
  requestToBroadcast,
} from '../../common/RecruitmentPayload';
import { broadcast, joinRoom } from '../../common/serverOperations';
import Rooms from '../../common/Rooms';

export default function recruitment(
  server: Server,
  socket: Socket,
  id: string
) {
  socket.on(Channels.RECRUITMENT_REQUEST, function (payload) {
    try {
      const broadcastPayload = extractBroadcastPayload(payload);
      joinRoom(socket, broadcastPayload.roomId);
      logSuccess(id, broadcastPayload);
      broadcastToNodes(server, broadcastPayload);
    } catch {
      log(id, 'Invalid payload, did not broadcast recruitment request');
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractBroadcastPayload(payload: any): RecruitmentBroadcastPayload {
  const parsedRequestPayload: RecruitmentRequestPayload = JSON.parse(payload);
  return requestToBroadcast(
    parsedRequestPayload,
    generateRoomId(parsedRequestPayload.invokingEndpointId)
  );
}

function generateRoomId(invokingEndpointId: string): string {
  return invokingEndpointId + '-' + Date.now();
}

function broadcastToNodes(
  server: Server,
  payload: RecruitmentBroadcastPayload
): void {
  broadcast(server, Rooms.NODES, Channels.RECRUITMENT_BROADCAST, payload);
}

function logSuccess(
  invokingEndpointId: string,
  payload: RecruitmentBroadcastPayload
): void {
  log(
    invokingEndpointId,
    'joined room ' +
      payload.roomId +
      ', broadcasted recruitment request:\n' +
      JSON.stringify(payload, null, 2)
  );
}
