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

  static get RECRUITMENT_ACCEPT(): string {
    return 'RECRUITMENT_ACCEPT';
  }

  static get OFFER_NODE(): string {
    return 'OFFER_NODE';
  }

  static get INITIALIZE_CONNECTION(): string {
    return 'INITIALIZE_CONNECTION';
  }

  static get INCOMING_CONNECTION(): string {
    return 'INCOMING_CONNECTION';
  }

  static get CONNECTION_ACCEPT(): string {
    return 'CONNECTION_ACCEPT';
  }

  static get COMPLETE_CONNECTION(): string {
    return 'COMPLETE_CONNECTION';
  }
}
