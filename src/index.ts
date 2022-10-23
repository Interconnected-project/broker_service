import EnvVariablesSingleton from './common/setup/EnvVariablesSingleton';
import BrokerServer from './brokerServer/BrokerServer';

const env = EnvVariablesSingleton.instance;
const broker = new BrokerServer();

broker.start(env.port);
