import { LOG_TAG as INVOKING_ENDPOINT_TAG } from '../../invokingEndpoints/InvokingEndpointsSocketServerSingleton';
import { LOG_TAG as NODES_TAG } from '../../nodes/NodesSocketServerSingleton';
import EnvVariablesSingleton from '../setup/EnvVariablesSingleton';

const isLogEnabled = EnvVariablesSingleton.instance.isLogEnabled;

export default function log(tag: string, msg: string) {
  if (isLogEnabled) {
    console.log('[' + tag + '] ' + msg);
  }
}

export function logNodes(msg: string) {
  log(NODES_TAG, msg);
}

export function logInvokingEndpoints(msg: string) {
  log(INVOKING_ENDPOINT_TAG, msg);
}
