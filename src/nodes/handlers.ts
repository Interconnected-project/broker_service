import { Socket } from 'socket.io';

export default function applyNodesHandlers(socket: Socket) {
  socket.on('star wars', function (from, msg) {
    console.log(from + ': ' + msg);
    socket.emit('star wars', 'Grievous', 'General Kenobi');
  });
}
