import Channels from '../../Channels';
import Connection from '../../Connection';
import ConnectionsHub from '../../ConnectionsHub';

export default function recruitmentRequest(
  connection: Connection,
  invokingEndpoints: ConnectionsHub
) {
  connection.socket.on(Channels.RECRUITMENT_ACCEPT, function (payload) {
    try {
      const contributorPayload = new ContributorPayload(payload);
      const invokingEndpoint = invokingEndpoints.get(
        contributorPayload.invokingEndpointId
      );
      if (invokingEndpoint === undefined) {
        sendError(connection);
      } else {
        invokingEndpoint.socket.emit(Channels.CONNECTION_ATTEMPT, payload);
        console.log(
          'Taking node ' +
            connection.id +
            "'s RECRUITMENT_ATTEMPT and forwarding a CONNECTION ATTEMPT to " +
            invokingEndpoint.id
        );
      }
    } catch {
      sendError(connection);
    }
  });
}

function sendError(connection: Connection): void {
  connection.socket.emit(Channels.RECRUITMENT_ACCEPT, 'Error');
}

class ContributorPayload {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private payload: any) {
    if (this.payload === undefined || this.payload === null) {
      throw new Error();
    }
  }

  get invokingEndpointId(): string {
    return this.checkAndReturnString(this.payload.invokingEndpointId);
  }

  get operationId(): string {
    return this.checkAndReturnString(this.payload.operationId);
  }

  get nodeId(): string {
    return this.checkAndReturnString(this.payload.nodeId);
  }

  private checkAndReturnString(s: string): string {
    if (
      s !== null &&
      s !== undefined &&
      typeof s === 'string' &&
      s.trim().length > 0
    ) {
      return s.trim();
    }
    throw new Error();
  }
}
