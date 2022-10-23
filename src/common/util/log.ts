import EnvVariablesSingleton from '../setup/EnvVariablesSingleton';

const BROKER_SERVER_TAG = 'BROKER SERVER';
const NODE_TAG = 'Node';
const INVOKING_ENDPOINT_TAG = 'Invoking Endpoint';

const isLogEnabled = EnvVariablesSingleton.instance.isLogEnabled;

export default function log(tag: string, msg: string) {
  if (isLogEnabled) {
    console.log('[' + tag + '] ' + msg + '\n');
  }
}

export function logBrokerServer(msg: string) {
  log(BROKER_SERVER_TAG, msg);
}

export function logNode(id: string, msg: string) {
  log(NODE_TAG + ' ' + id, msg);
}

export function logInvokingEndpoint(id: string, msg: string) {
  log(INVOKING_ENDPOINT_TAG + ' ' + id, msg);
}
