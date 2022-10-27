import checkAndReturnString from '../../common/util/checkAndReturnString';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class IceCandidatePayload {
  private _initiatorId: string;
  private _answererId: string;
  private _candidate: any;

  constructor(payload: any) {
    this._initiatorId = checkAndReturnString(payload.initiatorId);
    this._answererId = checkAndReturnString(payload.answererId);
    this._candidate = payload.candidate;
    if (this._candidate === undefined || this._candidate === null) {
      throw new Error();
    }
  }

  get initiatorId(): string {
    return this._initiatorId;
  }

  get answererId(): string {
    return this._answererId;
  }

  get candidate(): any {
    return this._candidate;
  }
}
