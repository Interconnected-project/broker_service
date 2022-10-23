import EnvVariablesSingleton from '../setup/EnvVariablesSingleton';

const BROKER_SERVER_TAG = 'BROKER';
const P2P_SERVER_TAG = 'P2P';
const NODE_TAG = 'Node';
const INVOKING_ENDPOINT_TAG = 'Invoking Endpoint';

const isLogEnabled = EnvVariablesSingleton.instance.isLogEnabled;

export default function log(tag: string, msg: string) {
  if (isLogEnabled) {
    console.log('[' + tag + '] ' + msg);
  }
}

export function logBrokerServer(msg: string) {
  log(BROKER_SERVER_TAG, msg);
}

export function logP2PServer(msg: string) {
  log(P2P_SERVER_TAG, msg);
}

export function logNode(id: string, channel: string, msg: string) {
  log(NODE_TAG + ' {' + channel + '}(' + id + ')', msg);
}

export function logInvokingEndpoint(id: string, channel: string, msg: string) {
  log(INVOKING_ENDPOINT_TAG + ' {' + channel + '}(' + id + ')', msg);
}
