import NodeConnection from './NodeConnection';

export default class NodeConnectionsHubSingleton {
  private static inst: NodeConnectionsHubSingleton | undefined = undefined;

  private connections: NodeConnection[];

  private constructor() {
    this.connections = [];
  }

  static get instance(): NodeConnectionsHubSingleton {
    if (NodeConnectionsHubSingleton.inst === undefined) {
      NodeConnectionsHubSingleton.inst = new NodeConnectionsHubSingleton();
    }
    return NodeConnectionsHubSingleton.inst;
  }

  add(connection: NodeConnection): boolean {
    if (!this.isPresent(connection.id)) {
      this.connections.push(connection);
      return true;
    }
    return false;
  }

  list(): string[] {
    return this.connections.map((conn) => conn.id);
  }

  get(id: string): NodeConnection | undefined {
    return this.connections.find((conn) => conn.id === id);
  }

  remove(id: string): NodeConnection | undefined {
    const conn = this.get(id);
    if (conn !== undefined) {
      const indexOf = this.connections.indexOf(conn);
      this.connections.splice(indexOf, 1);
    }
    return conn;
  }

  isPresent(id: string): boolean {
    return this.get(id) !== undefined;
  }
}
