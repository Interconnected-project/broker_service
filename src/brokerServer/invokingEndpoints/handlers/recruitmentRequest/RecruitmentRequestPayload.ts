import checkAndReturnInteger from '../../../../common/util/checkAndReturnInteger';
import checkAndReturnString from '../../../../common/util/checkAndReturnString';

export default class RecruitmentRequestPayload {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private payload: any) {
    if (payload === undefined || payload == null) {
      throw new Error();
    }
  }

  get invokingEndpointId(): string {
    return checkAndReturnString(this.payload.invokingEndpointId);
  }

  get operationId(): string {
    return checkAndReturnString(this.payload.operationId);
  }

  get nodesToReach(): number {
    return checkAndReturnInteger(this.payload.nodesToReach);
  }
}
