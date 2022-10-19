import SocketServer from './common/SocketServer';
import EnvVariablesSingleton from './common/setup/EnvVariablesSingleton';

const env = EnvVariablesSingleton.instance;

const nodes = new SocketServer('Nodes', (socket) => {
  socket.on('star wars', function (from, msg) {
    console.log(from + ': ' + msg);
    socket.emit('star wars', 'Grievous', 'General Kenobi');
  });
});
nodes.start(env.nodesPort);

const invokingEndpoints = new SocketServer('Invoking Endpoints', (socket) => {
  socket.on('jojo', function (from, msg) {
    console.log(from + ': ' + msg);
    socket.emit(
      'star wars',
      'Jotaro Kujo',
      "I can't beat the s* out of you without getting closer."
    );
  });
});
invokingEndpoints.start(env.invokingEndpointsPort);
