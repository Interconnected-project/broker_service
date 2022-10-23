import ConnectionsHub from '../../common/connectionsHub/ConnectionsHub';

export default class InvokingEndpointHub {
  private static _connections = new ConnectionsHub();

  private constructor() {
    //does nothing
  }

  static get connections(): ConnectionsHub {
    return this._connections;
  }
}
