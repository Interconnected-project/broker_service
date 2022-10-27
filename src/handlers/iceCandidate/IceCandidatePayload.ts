import Roles from '../../common/enums/Roles';
import checkAndReturnString from '../../common/util/checkAndReturnString';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class IceCandidatePayload {
  private _fromId: string;
  private _senderRole: string;
  private _toId: string;
  private _receiverRole: string;
  private _candidate: any;

  constructor(payload: any) {
    this._fromId = checkAndReturnString(payload.fromId);
    this._senderRole = checkAndReturnString(payload.senderRole);
    if (
      this._senderRole !== Roles.NODE &&
      this._senderRole !== Roles.INVOKING_ENDPOINT
    ) {
      throw new Error();
    }
    this._toId = checkAndReturnString(payload.toId);
    this._receiverRole = checkAndReturnString(payload.receiverRole);
    if (
      this._receiverRole !== Roles.NODE &&
      this._receiverRole !== Roles.INVOKING_ENDPOINT
    ) {
      throw new Error();
    }
    this._candidate = payload.candidate;
    if (this._candidate === undefined || this._candidate === null) {
      throw new Error();
    }
  }

  get fromId(): string {
    return this._fromId;
  }

  get senderRole(): string {
    return this._senderRole;
  }

  get toId(): string {
    return this._toId;
  }

  get receiverRole(): string {
    return this._receiverRole;
  }

  get candidate(): any {
    return this._candidate;
  }
}
