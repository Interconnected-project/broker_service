import EnvVariablesSingleton from '../setup/EnvVariablesSingleton';

const BROKER_SERVER_TAG = 'BROKER';

const isLogEnabled = EnvVariablesSingleton.instance.isLogEnabled;

export default function log(tag: string, msg: string) {
  if (isLogEnabled) {
    console.log('[' + tag + '] ' + msg);
  }
}

export function logBrokerServer(msg: string) {
  log(BROKER_SERVER_TAG, msg);
}
