import Roles from '../../common/enums/Roles';
import checkAndReturnInteger from '../../common/util/checkAndReturnInteger';
import checkAndReturnString from '../../common/util/checkAndReturnString';

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

  get initiatorId(): string {
    return checkAndReturnString(this.payload.initiatorId);
  }

  get initiatorRole(): string {
    const res = checkAndReturnString(this.payload.initiatorRole);
    if (res !== Roles.INVOKING_ENDPOINT && res != Roles.NODE) {
      throw new Error();
    }
    return res;
  }

  get operationId(): string {
    return checkAndReturnString(this.payload.operationId);
  }

  get nodesToReach(): number {
    return checkAndReturnInteger(this.payload.nodesToReach);
  }
}
