import {
  logInvokingEndpoint,
  logNode,
  logBrokerServer,
} from '../../common/util/log';
import Channels from '../../common/enums/Channels';
import Connection from '../../common/connectionsHub/Connection';
import NodesHub from '../../brokerServer/nodes/NodesHub';
import InitializeConnectionPayload from './InitializeConnectionPayload';
import Roles from '../../common/enums/Roles';

export default function initializeConnectionHandler(connection: Connection) {
  connection.socket.on(Channels.INITIALIZE_CONNECTION, function (payload) {
    try {
      const initializeConnectionPayload = new InitializeConnectionPayload(
        payload
      );
      if (connection.id === initializeConnectionPayload.initiatorId) {
        const answerer = NodesHub.connections.get(
          initializeConnectionPayload.answererId
        );
        if (answerer !== undefined) {
          const msg =
            'sending ' +
            Channels.INCOMING_CONNECTION +
            ' to answerer ' +
            initializeConnectionPayload.answererId;
          if (initializeConnectionPayload.initiatorRole === Roles.NODE) {
            logNode(connection.id, Channels.INITIALIZE_CONNECTION, msg);
          } else {
            logInvokingEndpoint(
              connection.id,
              Channels.INITIALIZE_CONNECTION,
              msg
            );
          }
          answerer.socket.emit(Channels.INCOMING_CONNECTION, payload);
          return;
        }
      }
      onError(connection);
    } catch {
      onError(connection);
    }
  });
}

function onError(connection: Connection): void {
  connection.socket.emit(Channels.INITIALIZE_CONNECTION, 'ERROR');
  logBrokerServer(Channels.INITIALIZE_CONNECTION + ' ERROR');
}
