import createServer from './common/server';
import NodeConnectionsHubSingleton from './nodes/NodeConnectionsHubSingleton';
import EnvVariablesSingleton from './setup/EnvVariablesSingleton';

createServer(
  'Nodes',
  EnvVariablesSingleton.instance.nodesPort,
  NodeConnectionsHubSingleton.hub,
  (socket) => {
    socket.on('star wars', function (from, msg) {
      console.log(from + ': ' + msg);
      socket.emit('star wars', 'Grievous', 'General Kenobi');
    });
  }
);
