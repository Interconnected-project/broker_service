import EnvVariablesSingleton from './common/setup/EnvVariablesSingleton';
import NodesSocketServerSingleton from './nodes/NodesSocketServerSingleton';
import InvokingEndpointsSocketServerSingleton from './invokingEndpoints/InvokingEndpointsSocketServerSingleton';

const env = EnvVariablesSingleton.instance;

NodesSocketServerSingleton.server.start(env.nodesPort);
InvokingEndpointsSocketServerSingleton.server.start(env.invokingEndpointsPort);
