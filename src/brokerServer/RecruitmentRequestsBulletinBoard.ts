import RecruitmentRequest from './RecruitmentRequest';
import { logBrokerServer as log } from '../common/util/log';
export default class RecruitmentRequestBulletinBoard {
  private static requests: RecruitmentRequest[] = [];

  private constructor() {
    //TODO does nothing
  }

  static publishRequest(request: RecruitmentRequest): boolean {
    if (
      this.find(request.invokingEndpointId, request.operationId) !== undefined
    ) {
      log(
        'duplicated recruitment request ' +
          this.getRequestPair(request) +
          ' rejected'
      );
      return false;
    }
    this.requests.push(request);
    log('recruitment request ' + this.getRequestPair(request) + ' published');
    return true;
  }

  static acceptRequest(
    invokingEndpointId: string,
    operationId: string
  ): RecruitmentRequest | undefined {
    const request = this.find(invokingEndpointId, operationId);
    if (request === undefined) {
      return undefined;
    }
    request.increaseServedNodes();
    log(
      'served recruitment request ' +
        this.getRequestPair(request) +
        this.getServedCount(request)
    );
    if (request.isFulfilled) {
      this.requests.splice(this.requests.indexOf(request), 1);
      log('fulfilled recruitment request ' + this.getRequestPair(request));
    }
    return request;
  }

  static revokeRequests(invokingEndpointId: string): void {
    log('revoked recruitment requests connected to ' + invokingEndpointId);
    this.requests = this.requests.filter((r) => {
      return r.invokingEndpointId !== invokingEndpointId;
    });
  }

  private static find(
    invokingEndpointId: string,
    operationId: string
  ): RecruitmentRequest | undefined {
    return this.requests.find((r) => {
      return (
        r.invokingEndpointId === invokingEndpointId &&
        r.operationId === operationId
      );
    });
  }

  private static getRequestPair(request: RecruitmentRequest): string {
    return '(' + request.invokingEndpointId + ', ' + request.operationId + ')';
  }

  private static getServedCount(request: RecruitmentRequest): string {
    return '[' + request.servedNodes + '/' + request.nodesToReach + ']';
  }
}
