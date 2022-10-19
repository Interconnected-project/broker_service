import Connection from './Connection';

export default class ConnectionsHub {
  private connections: Connection[] = [];

  add(connection: Connection): boolean {
    if (!this.isPresent(connection.id)) {
      this.connections.push(connection);
      return true;
    }
    return false;
  }

  list(): string[] {
    return this.connections.map((conn) => conn.id);
  }

  get(id: string): Connection | undefined {
    return this.connections.find((conn) => conn.id === id);
  }

  remove(id: string): Connection | undefined {
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
