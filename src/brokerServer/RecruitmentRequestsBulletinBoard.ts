import RecruitmentRequest from './RecruitmentRequest';

export default class RecruitmentRequestBulletinBoard {
  private static requests: RecruitmentRequest[] = [];

  private constructor() {
    //TODO does nothing
  }

  static publishRequest(request: RecruitmentRequest): boolean {
    if (
      this.find(request.invokingEndpointId, request.operationId) !== undefined
    ) {
      return false;
    }
    this.requests.push(request);
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
    if (request.isFulfilled) {
      this.requests.splice(this.requests.indexOf(request), 1);
    }
    return request;
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
}
