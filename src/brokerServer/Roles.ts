export default class Roles {
  private constructor() {
    //does nothing
  }

  static get NODE(): string {
    return 'NODE';
  }

  static get INVOKING_ENDPOINT(): string {
    return 'INVOKING_ENDPOINT';
  }
}
