import Channels from '../../common/enums/Channels';
import { logNode as log } from '../../common/util/log';
import Connection from '../../common/connectionsHub/Connection';
import AnswerConnectionPayload from './AnswerConnectionPayload';
import InvokingEndpointHub from '../../brokerServer/invokingEndpoints/InvokingEndpointsHub';

export default function answerConnectionHandler(connection: Connection) {
  connection.socket.on(Channels.ANSWER_CONNECTION, function (payload) {
    try {
      const answerConnectionPayload = new AnswerConnectionPayload(payload);
      const invokingEndpoint = InvokingEndpointHub.connections.get(
        answerConnectionPayload.invokingEndpointId
      );
      if (invokingEndpoint !== undefined) {
        log(
          connection.id,
          Channels.ANSWER_CONNECTION,
          'send ' +
            Channels.FINALIZE_CONNECTION +
            ' to Invoking Endpoint ' +
            answerConnectionPayload.invokingEndpointId
        );
        invokingEndpoint.socket.emit(Channels.FINALIZE_CONNECTION, payload);
      } else {
        onError(connection);
      }
    } catch {
      onError(connection);
    }
  });
}

function onError(connection: Connection): void {
  connection.socket.emit(Channels.ANSWER_CONNECTION, 'ERROR');
  log(connection.id, Channels.ANSWER_CONNECTION, 'ERROR');
}
