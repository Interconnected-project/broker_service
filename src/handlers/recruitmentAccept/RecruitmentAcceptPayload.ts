/* eslint-disable @typescript-eslint/no-explicit-any */
import checkAndReturnString from '../../common/util/checkAndReturnString';
import RecruitmentRequestPayload from '../recruitmentRequest/RecruitmentRequestPayload';

class RecruitmentAcceptPayload extends RecruitmentRequestPayload {
  private _payload: any;
  private _answererId: string;

  constructor(payload: any) {
    super(payload);
    this._payload = payload;
    this._answererId = checkAndReturnString(this._payload.answererId);
  }

  get answererId(): string {
    return this._answererId;
  }
}

export default RecruitmentAcceptPayload;
