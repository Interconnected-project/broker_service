/* eslint-disable @typescript-eslint/no-explicit-any */
import RecruitmentRequest from './RecruitmentRequest';
export default class RecruitmentRequestBulletinBoard {
  private static requests: RecruitmentRequest[] = [];

  private constructor() {
    //TODO does nothing
  }

  static publishRequest(request: RecruitmentRequest): boolean {
    if (
      this.find(request.operationId, request.masterId, request.masterRole) !==
      undefined
    ) {
      return false;
    }
    this.requests.push(request);
    return true;
  }

  static acceptRequest(
    operationId: string,
    masterId: string,
    masterRole: string
  ): RecruitmentRequest | undefined {
    const request = this.find(operationId, masterId, masterRole);
    if (request === undefined) {
      return undefined;
    }
    request.increaseServedNodes();
    if (request.isFulfilled) {
      this.requests.splice(this.requests.indexOf(request), 1);
    }
    return request;
  }

  static revokeRequests(masterId: string): void {
    this.requests = this.requests.filter((r) => {
      return r.masterId !== masterId;
    });
  }

  static get pendingRequestsPayload(): any[] {
    return this.requests.map((r) => {
      return r.payload;
    });
  }

  private static find(
    operationId: string,
    masterId: string,
    masterRole: string
  ): RecruitmentRequest | undefined {
    return this.requests.find((r) => {
      return (
        r.operationId === operationId &&
        r.masterId === masterId &&
        r.masterRole === masterRole
      );
    });
  }
}
