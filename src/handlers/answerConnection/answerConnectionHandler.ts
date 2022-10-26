import Channels from '../../common/enums/Channels';
import { logNode as log } from '../../common/util/log';
import Connection from '../../common/connectionsHub/Connection';
import AnswerConnectionPayload from './AnswerConnectionPayload';
import InvokingEndpointHub from '../../brokerServer/invokingEndpoints/InvokingEndpointsHub';
import Roles from '../../common/enums/Roles';
import NodesHub from '../../brokerServer/nodes/NodesHub';

export default function answerConnectionHandler(connection: Connection) {
  connection.socket.on(Channels.ANSWER_CONNECTION, function (payload) {
    try {
      const answerConnectionPayload = new AnswerConnectionPayload(payload);
      if (connection.id === answerConnectionPayload.answererId) {
        let initiator: Connection | undefined = undefined;
        if (answerConnectionPayload.initiatorRole === Roles.NODE) {
          initiator = NodesHub.connections.get(
            answerConnectionPayload.initiatorId
          );
        } else {
          initiator = InvokingEndpointHub.connections.get(
            answerConnectionPayload.initiatorId
          );
        }
        if (initiator !== undefined) {
          log(
            connection.id,
            Channels.ANSWER_CONNECTION,
            'send ' +
              Channels.FINALIZE_CONNECTION +
              ' to ' +
              answerConnectionPayload.initiatorRole +
              ' ' +
              answerConnectionPayload.invokingEndpointId
          );
          initiator.socket.emit(Channels.FINALIZE_CONNECTION, payload);
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
  connection.socket.emit(Channels.ANSWER_CONNECTION, 'ERROR');
  log(connection.id, Channels.ANSWER_CONNECTION, 'ERROR');
}
