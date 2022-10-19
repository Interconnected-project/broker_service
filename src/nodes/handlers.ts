import { Socket } from 'socket.io';
import Connection from '../common/Connection';

export default function applyNodesHandlers(
  socket: Socket,
  connection: Connection
) {
  socket.on('star wars', function (from, msg) {
    console.log(from + ': ' + msg);
    socket.emit('star wars', 'Grievous', 'General Kenobi');
  });
}
