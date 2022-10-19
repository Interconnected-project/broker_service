import ConnectionsHub from '../common/ConnectionsHub';

export default class InvokingEndpointsConnectionsHubSingleton {
  private static inst: InvokingEndpointsConnectionsHubSingleton | undefined =
    undefined;

  private connectionsHub: ConnectionsHub;

  private constructor() {
    this.connectionsHub = new ConnectionsHub();
  }

  static get hub(): ConnectionsHub {
    if (InvokingEndpointsConnectionsHubSingleton.inst === undefined) {
      InvokingEndpointsConnectionsHubSingleton.inst =
        new InvokingEndpointsConnectionsHubSingleton();
    }
    return InvokingEndpointsConnectionsHubSingleton.inst.connectionsHub;
  }
}
