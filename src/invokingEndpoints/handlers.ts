import { Socket } from 'socket.io';
export default function applyInvokingEndpointsHandlers(socket: Socket) {
  socket.on('jojo', function (from, msg) {
    console.log(from + ': ' + msg);
    socket.emit(
      'star wars',
      'Jotaro Kujo',
      "I can't beat the s* out of you without getting closer."
    );
  });
}
