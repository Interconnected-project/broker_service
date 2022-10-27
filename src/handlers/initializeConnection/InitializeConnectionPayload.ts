/* eslint-disable @typescript-eslint/no-explicit-any */
import RecruitmentAcceptPayload from '../recruitmentAccept/RecruitmentAcceptPayload';

class InitializeConnectionPayload extends RecruitmentAcceptPayload {
  constructor(payload: any) {
    super(payload);
    if (payload.sdp === undefined || payload.sdp === null) {
      throw new Error();
    }
  }
}

export default InitializeConnectionPayload;
