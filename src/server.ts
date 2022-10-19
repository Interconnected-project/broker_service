// setupServer(server);

import { Server } from 'socket.io';

const server = new Server({
  /* options */
});

server.on('connection', (socket) => {
  // TODO
});

export default server;
