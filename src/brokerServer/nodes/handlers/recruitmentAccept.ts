import Channels from '../../Channels';
import Connection from '../../Connection';
import ConnectionsHub from '../../ConnectionsHub';

export default function recruitmentRequest(
  connection: Connection,
  invokingEndpoints: ConnectionsHub
) {
  connection.socket.on(Channels.RECRUITMENT_ACCEPT, function (payload) {
    const invokingEndpoint = invokingEndpoints.get(payload.invokingEndpointId);
    if (invokingEndpoint !== undefined) {
      invokingEndpoint.socket.emit(Channels.CONNECTION_ATTEMPT, payload);
      console.log(
        'Taking node ' +
          connection.id +
          "'s RECRUITMENT_ATTEMPT and forwarding a CONNECTION ATTEMPT to " +
          invokingEndpoint.id
      );
    }
  });
}
