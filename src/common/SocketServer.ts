import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

import Connection from './Connection';
import ConnectionsHub from './ConnectionsHub';
import log from './util/log';

export default class SocketServer {
  private httpServer = createServer();
  private server = new Server(this.httpServer, {
    cors: {
      origin: '*',
      methods: '*',
    },
  });

  private hub: ConnectionsHub = new ConnectionsHub();

  constructor(
    private name: string,
    applyHandlers: (socket: Socket, connection: Connection) => void
  ) {
    this.server.on('connection', (socket) => {
      let connection: Connection | undefined = undefined;
      const mac = socket.handshake.query.mac;
      if (mac === undefined || Array.isArray(mac)) {
        log(name, 'new connection discaretd: no mac provided');
        socket.disconnect();
      } else {
        connection = new Connection(mac, socket);
        if (this.hub.add(connection)) {
          log(name, 'new connection: ' + connection.id);
          applyHandlers(socket, connection);
        } else {
          log(
            name,
            'new connection discaretd: duplicate(' + connection.id + ')'
          );
          socket.disconnect();
        }
      }

      socket.on('disconnecting', () => {
        if (connection !== undefined && this.hub.remove(connection.id)) {
          log(name, 'disconnected: ' + connection.id);
          connection = undefined;
        }
      });
    });
  }

  start(port: number) {
    this.httpServer.listen(port);
    log(this.name, 'started on port ' + port);
  }

  async broadcastMsg(channel: string, msg: unknown): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.server.sockets.emit(channel, msg, { receivers: 'everyone' });
        resolve();
      } catch (e) {
        log(
          this.name,
          'broadcast msg error\nchannel: ' +
            channel +
            '\nmsg: ' +
            msg +
            '\n' +
            e
        );
        reject();
      }
    });
  }

  async sendMsg(id: string, channel: string, msg: unknown): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const s = this.hub.get(id);
        if (s === undefined) {
          resolve(false);
        } else {
          s.socket.emit(channel, msg);
          resolve(true);
        }
      } catch (e) {
        log(
          this.name,
          'send msg error\nchannel: ' + channel + '\nmsg: ' + msg + '\n' + e
        );
        reject();
      }
    });
  }
}
