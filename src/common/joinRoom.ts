import { Socket } from 'socket.io';

export default function joinRoom(socket: Socket, roomId: string): void {
  socket.join(roomId);
}
