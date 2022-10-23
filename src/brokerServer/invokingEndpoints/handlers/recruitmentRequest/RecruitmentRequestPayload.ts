export default class RecruitmentRequestPayload {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private payload: any) {
    if (payload === undefined || payload == null) {
      throw new Error();
    }
  }

  get invokingEndpointId(): string {
    return this.checkAndReturnString(this.payload.invokingEndpointId);
  }

  get operationId(): string {
    return this.checkAndReturnString(this.payload.operationId);
  }

  get nodesToReach(): number {
    return this.checkAndReturnInteger(this.payload.nodesToReach);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private checkAndReturnString(s: any): string {
    if (
      s !== null &&
      s !== undefined &&
      typeof s === 'string' &&
      s.trim().length > 0
    ) {
      return s.trim();
    }
    throw new Error();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private checkAndReturnInteger(i: any): number {
    if (
      i !== null &&
      i !== undefined &&
      typeof i === 'number' &&
      Number.isInteger(i) &&
      i > 0
    ) {
      return i;
    }
    throw new Error();
  }
}
