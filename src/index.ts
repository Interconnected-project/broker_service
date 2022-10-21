import EnvVariablesSingleton from './common/setup/EnvVariablesSingleton';
import applyInvokingEndpointHandlers from './invokingEndpoints/applyInvokingEndpointHandlers';
import SocketServer from './SocketServer';

const env = EnvVariablesSingleton.instance;
const server = new SocketServer(
  applyInvokingEndpointHandlers,
  applyInvokingEndpointHandlers
);

server.start(env.port);
