// setupServer(server);

import { Server } from 'socket.io';

const server = new Server({
  /* options */
});

server.on('connection', (socket) => {
  console.log('New connection ' + socket.id);
});

export default server;
