/* eslint-disable @typescript-eslint/no-explicit-any */
import RecruitmentAcceptPayload from '../recruitmentAccept/RecruitmentAcceptPayload';

class InitializeConnectionPayload extends RecruitmentAcceptPayload {
  constructor(payload: any) {
    super(payload);
    if (payload.signal === undefined || payload.signal === null) {
      throw new Error();
    }
  }
}

export default InitializeConnectionPayload;
