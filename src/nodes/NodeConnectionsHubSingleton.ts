import ConnectionsHub from '../common/ConnectionsHub';

export default class NodeConnectionsHubSingleton {
  private static inst: NodeConnectionsHubSingleton | undefined = undefined;

  private connectionsHub: ConnectionsHub;

  private constructor() {
    this.connectionsHub = new ConnectionsHub();
  }

  static get hub(): ConnectionsHub {
    if (NodeConnectionsHubSingleton.inst === undefined) {
      NodeConnectionsHubSingleton.inst = new NodeConnectionsHubSingleton();
    }
    return NodeConnectionsHubSingleton.inst.connectionsHub;
  }
}
