/* eslint-disable @typescript-eslint/no-explicit-any */
import { Socket } from 'socket.io';

export default class RecruitmentRequest {
  private _socket: Socket;
  private _invokingEndpointId: string;
  private _operationId: string;
  private _nodesToReach: number;
  private _servedNodes: number;
  private _payload: any;

  constructor(
    socket: Socket,
    invokingEnpointId: string,
    operationId: string,
    nodesToReach: number,
    payload: any
  ) {
    this._socket = socket;
    this._invokingEndpointId = invokingEnpointId;
    this._operationId = operationId;
    this._nodesToReach = nodesToReach;
    this._servedNodes = 0;
    this._payload = payload;
  }

  get socket(): Socket {
    return this._socket;
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
