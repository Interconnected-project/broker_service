export default class RecruitmentRequest {
  private _invokingEndpointId: string;
  private _operationId: string;
  private _nodesToReach: number;
  private _servedNodes: number;

  constructor(
    invokingEnpointId: string,
    operationId: string,
    nodesToReach: number
  ) {
    this._invokingEndpointId = invokingEnpointId;
    this._operationId = operationId;
    this._nodesToReach = nodesToReach;
    this._servedNodes = 0;
  }

  get invokingEndpointId(): string {
    return this._invokingEndpointId;
  }

  get operationId(): string {
    return this._operationId;
  }

  get nodesToReach(): number {
    return this._nodesToReach;
  }

  increaseServedNodes(): void {
    this._servedNodes += 1;
  }

  get isFulfilled(): boolean {
    return this._servedNodes >= this._nodesToReach;
  }
}
