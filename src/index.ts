import EnvVariablesSingleton from './common/setup/EnvVariablesSingleton';
import BrokerServer from './brokerServer/BrokerServer';

const env = EnvVariablesSingleton.instance;
const server = new BrokerServer();

server.start(env.port);
