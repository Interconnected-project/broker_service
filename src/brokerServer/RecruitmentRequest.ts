/* eslint-disable @typescript-eslint/no-explicit-any */
export default class RecruitmentRequest {
  private _operationId: string;
  private _masterId: string;
  private _masterRole: string;
  private _nodesToReach: number;
  private _servedNodes: number;
  private _payload: any;

  constructor(
    operationId: string,
    masterId: string,
    masterRole: string,
    nodesToReach: number,
    payload: any
  ) {
    this._operationId = operationId;
    this._masterId = masterId;
    this._masterRole = masterRole;
    this._nodesToReach = nodesToReach;
    this._servedNodes = 0;
    this._payload = payload;
  }

  get operationId(): string {
    return this._operationId;
  }

  get masterId(): string {
    return this._masterId;
  }

  get masterRole(): string {
    return this._masterRole;
  }

  get nodesToReach(): number {
    return this._nodesToReach;
  }

  get servedNodes(): number {
    return this._servedNodes;
  }

  get payload(): any {
    return this._payload;
  }

  increaseServedNodes(): void {
    this._servedNodes += 1;
  }

  get isFulfilled(): boolean {
    return this._servedNodes >= this._nodesToReach;
  }
}
