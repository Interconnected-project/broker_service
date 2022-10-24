/* eslint-disable @typescript-eslint/no-explicit-any */
import checkAndReturnString from '../../../../common/util/checkAndReturnString';
import RecruitmentRequestPayload from '../recruitmentRequest/RecruitmentRequestPayload';

class InitializeConnectionPayload extends RecruitmentRequestPayload {
  private _payload: any;

  constructor(payload: any) {
    super(payload);
    this._payload = payload;
  }

  get nodeId(): string {
    return checkAndReturnString(this._payload.nodeId);
  }
}

export default InitializeConnectionPayload;
