import RecruitmentRequest from './RecruitmentRequest';
import { logBrokerServer as log } from '../common/util/log';
export default class RecruitmentRequestBulletinBoard {
  private static requests: RecruitmentRequest[] = [];

  private constructor() {
    //TODO does nothing
  }

  static publishRequest(request: RecruitmentRequest): boolean {
    if (
      this.find(
        request.invokingEndpointId,
        request.operationId,
        request.initiatorId,
        request.initiatorRole
      ) !== undefined
    ) {
      log(
        'duplicated recruitment request ' +
          this.getRequestInfo(request) +
          ' rejected'
      );
      return false;
    }
    this.requests.push(request);
    log('recruitment request ' + this.getRequestInfo(request) + ' published');
    return true;
  }

  static acceptRequest(
    invokingEndpointId: string,
    operationId: string,
    initiatorId: string,
    initiatorRole: string
  ): RecruitmentRequest | undefined {
    const request = this.find(
      invokingEndpointId,
      operationId,
      initiatorId,
      initiatorRole
    );
    if (request === undefined) {
      return undefined;
    }
    request.increaseServedNodes();
    log(
      'served recruitment request ' +
        this.getRequestInfo(request) +
        this.getServedCount(request)
    );
    if (request.isFulfilled) {
      this.requests.splice(this.requests.indexOf(request), 1);
      log('fulfilled recruitment request ' + this.getRequestInfo(request));
    }
    return request;
  }

  static revokeRequests(invokingEndpointId: string): void {
    log('revoked recruitment requests connected to ' + invokingEndpointId);
    this.requests = this.requests.filter((r) => {
      return r.invokingEndpointId !== invokingEndpointId;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static get pendingRequestsPayload(): any[] {
    return this.requests.map((r) => {
      return r.payload;
    });
  }

  private static find(
    invokingEndpointId: string,
    operationId: string,
    initiatorId: string,
    initiatorRole: string
  ): RecruitmentRequest | undefined {
    return this.requests.find((r) => {
      return (
        r.invokingEndpointId === invokingEndpointId &&
        r.operationId === operationId &&
        r.initiatorId === initiatorId &&
        r.initiatorRole === initiatorRole
      );
    });
  }

  private static getRequestInfo(request: RecruitmentRequest): string {
    return (
      '(' +
      request.invokingEndpointId +
      ', ' +
      request.operationId +
      ', ' +
      request.initiatorRole +
      ', ' +
      request.initiatorId +
      ')'
    );
  }

  private static getServedCount(request: RecruitmentRequest): string {
    return '[' + request.servedNodes + '/' + request.nodesToReach + ']';
  }
}
