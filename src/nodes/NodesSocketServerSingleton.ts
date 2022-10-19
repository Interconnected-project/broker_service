import SocketServer from '../common/SocketServer';
import applyNodesHandlers from './handlers';

const LOG_TAG = 'Nodes';

export default class NodesSocketServerSingleton {
  private static instance: NodesSocketServerSingleton | undefined = undefined;
  private _server: SocketServer;

  private constructor() {
    this._server = new SocketServer(LOG_TAG, applyNodesHandlers);
  }

  static get server(): SocketServer {
    if (NodesSocketServerSingleton.instance === undefined) {
      NodesSocketServerSingleton.instance = new NodesSocketServerSingleton();
    }
    return NodesSocketServerSingleton.instance._server;
  }
}
