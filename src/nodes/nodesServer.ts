import { Server } from 'socket.io';
import NodeConnection from './NodeConnection';
import NodeConnectionsHubSingleton from './NodeConnectionsHubSingleton';

const nodesServer = new Server({
  /* options */
});

const nodeConnectionsHub = NodeConnectionsHubSingleton.instance;

nodesServer.on('connection', (socket) => {
  let nodeConnection: NodeConnection | undefined = undefined;

  console.log('New Node connection ' + socket.id);
  const mac = socket.handshake.query.mac;
  if (mac === undefined || Array.isArray(mac)) {
    console.log('No mac provided');
    socket.disconnect();
  } else {
    nodeConnection = new NodeConnection(mac, socket);
    nodeConnectionsHub.add(nodeConnection);

    socket.on('CH01', function (from, msg) {
      console.log('MSG', from, ' saying ', msg);
      socket.emit('Reply', 'General Kenobi');
    });
  }

  socket.on('disconnecting', () => {
    console.log(socket.handshake.query.mac);
    if (nodeConnection !== undefined) {
      nodeConnectionsHub.remove(nodeConnection.id);
      nodeConnection = undefined;
    }
  });
});

export default nodesServer;
