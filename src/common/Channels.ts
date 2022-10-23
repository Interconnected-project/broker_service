export default class Channels {
  private constructor() {
    //does nothing
  }

  static get RECRUITMENT_REQUEST(): string {
    return 'RECRUITMENT_REQUEST';
  }

  static get RECRUITMENT_BROADCAST(): string {
    return 'RECRUITMENT_BROADCAST';
  }

  static get JOIN(): string {
    return 'JOIN';
  }

  static get TEST(): string {
    return 'TEST';
  }
}
