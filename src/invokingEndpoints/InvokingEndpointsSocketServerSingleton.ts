import { Socket } from 'socket.io';

import SocketServer from '../common/SocketServer';
import Connection from '../common/Connection';
import mapReduceServiceMasterRecruitment from './handlers/recruitment';

export const LOG_TAG = 'Invoking Endpoints';

export default class InvokingEndpointsSocketServerSingleton {
  private static instance: InvokingEndpointsSocketServerSingleton | undefined =
    undefined;
  private _server: SocketServer;

  private constructor() {
    this._server = new SocketServer(LOG_TAG, applyHandlers);
  }

  static get server(): SocketServer {
    if (InvokingEndpointsSocketServerSingleton.instance === undefined) {
      InvokingEndpointsSocketServerSingleton.instance =
        new InvokingEndpointsSocketServerSingleton();
    }
    return InvokingEndpointsSocketServerSingleton.instance._server;
  }
}

function applyHandlers(socket: Socket, connection: Connection) {
  mapReduceServiceMasterRecruitment(socket, connection);
}
