import createServer from './common/server';
import NodeConnectionsHubSingleton from './nodes/NodeConnectionsHubSingleton';
import EnvVariablesSingleton from './common/setup/EnvVariablesSingleton';
import InvokingEndpointsConnectionsHubSingleton from './invokingEndpoints/InvokingEndpointsConnectionsHubSingleton';

const env = EnvVariablesSingleton.instance;

createServer(
  'Nodes',
  env.nodesPort,
  NodeConnectionsHubSingleton.hub,
  (socket) => {
    socket.on('star wars', function (from, msg) {
      console.log(from + ': ' + msg);
      socket.emit('star wars', 'Grievous', 'General Kenobi');
    });
  }
);

createServer(
  'Invoking Endpoints',
  env.invokingEndpointsPort,
  InvokingEndpointsConnectionsHubSingleton.hub,
  (socket) => {
    socket.on('jojo', function (from, msg) {
      console.log(from + ': ' + msg);
      socket.emit(
        'star wars',
        'Jotaro Kujo',
        "I can't beat the s* out of you without getting closer."
      );
    });
  }
);
