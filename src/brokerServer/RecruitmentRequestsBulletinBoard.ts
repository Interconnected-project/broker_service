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
  ): boolean {
    const request = this.find(invokingEndpointId, operationId);
    if (request === undefined) {
      return false;
    }
    request.increaseServedNodes();
    if (request.isFulfilled) {
      this.requests.splice(this.requests.indexOf(request), 1);
    }
    return true;
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
