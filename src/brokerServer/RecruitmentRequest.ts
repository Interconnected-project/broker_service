/* eslint-disable @typescript-eslint/no-explicit-any */
export default class RecruitmentRequest {
  private _invokingEndpointId: string;
  private _operationId: string;
  private _initiatorId: string;
  private _initiatorRole: string;
  private _nodesToReach: number;
  private _servedNodes: number;
  private _payload: any;

  constructor(
    invokingEnpointId: string,
    operationId: string,
    initiatorId: string,
    initiatorRole: string,
    nodesToReach: number,
    payload: any
  ) {
    this._invokingEndpointId = invokingEnpointId;
    this._operationId = operationId;
    this._initiatorId = initiatorId;
    this._initiatorRole = initiatorRole;
    this._nodesToReach = nodesToReach;
    this._servedNodes = 0;
    this._payload = payload;
  }

  get invokingEndpointId(): string {
    return this._invokingEndpointId;
  }

  get operationId(): string {
    return this._operationId;
  }

  get initiatorId(): string {
    return this._initiatorId;
  }

  get initiatorRole(): string {
    return this._initiatorRole;
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
