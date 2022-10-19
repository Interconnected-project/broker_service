import SocketServer from '../common/SocketServer';
import applyInvokingEndpointsHandlers from './handlers';

export const LOG_TAG = 'Invoking Endpoints';

export default class InvokingEndpointsSocketServerSingleton {
  private static instance: InvokingEndpointsSocketServerSingleton | undefined =
    undefined;
  private _server: SocketServer;

  private constructor() {
    this._server = new SocketServer(LOG_TAG, applyInvokingEndpointsHandlers);
  }

  static get server(): SocketServer {
    if (InvokingEndpointsSocketServerSingleton.instance === undefined) {
      InvokingEndpointsSocketServerSingleton.instance =
        new InvokingEndpointsSocketServerSingleton();
    }
    return InvokingEndpointsSocketServerSingleton.instance._server;
  }
}
