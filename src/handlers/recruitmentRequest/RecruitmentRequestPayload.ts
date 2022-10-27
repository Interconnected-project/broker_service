/* eslint-disable @typescript-eslint/no-explicit-any */
import Roles from '../../common/enums/Roles';
import checkAndReturnInteger from '../../common/util/checkAndReturnInteger';
import checkAndReturnString from '../../common/util/checkAndReturnString';

export default class RecruitmentRequestPayload {
  private _invokingEndpointId: string;
  private _initiatorId: string;
  private _initiatorRole: string;
  private _operationId: string;
  private _nodesToReach: number;

  constructor(private payload: any) {
    if (payload === undefined || payload == null) {
      throw new Error();
    }
    this._invokingEndpointId = checkAndReturnString(
      this.payload.invokingEndpointId
    );
    this._initiatorId = checkAndReturnString(this.payload.initiatorId);
    this._initiatorRole = checkAndReturnString(this.payload.initiatorRole);
    if (
      this._initiatorRole !== Roles.INVOKING_ENDPOINT &&
      this._initiatorRole != Roles.NODE
    ) {
      throw new Error();
    }
    this._operationId = checkAndReturnString(this.payload.operationId);
    this._nodesToReach = checkAndReturnInteger(this.payload.nodesToReach);
  }

  get invokingEndpointId(): string {
    return this._invokingEndpointId;
  }

  get initiatorId(): string {
    return this._initiatorId;
  }

  get initiatorRole(): string {
    return this._initiatorRole;
  }

  get operationId(): string {
    return this._operationId;
  }

  get nodesToReach(): number {
    return this._nodesToReach;
  }
}
