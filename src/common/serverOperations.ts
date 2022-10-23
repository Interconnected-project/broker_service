import { Server, Socket } from 'socket.io';

export function joinRoom(socket: Socket, roomId: string): void {
  socket.join(roomId);
}

export function broadcast(
  server: Server,
  roomId: string,
  channel: string,
  payload: unknown
): void {
  server.sockets.to(roomId).emit(channel, payload, {
    receivers: 'everyone',
  });
}
