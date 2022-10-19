export default class ContributionDemand {
  private _id: string;
  private _payload: string;
  private applicants: string[] = [];

  constructor(id: string, payload: string) {
    this._id = id;
    this._payload = payload;
  }

  get id(): string {
    return deepCopy(this._id);
  }

  get payload(): string {
    return deepCopy(this._payload);
  }

  get applicantsSize(): number {
    return this.applicants.length;
  }

  addApplicant(id: string) {
    this.applicants.push(id);
  }

  get randomApplicant(): string | undefined {
    try {
      return this.applicants.splice(
        Math.floor(Math.random() * this.applicants.length),
        1
      )[0];
    } catch {
      return undefined;
    }
  }
}

function deepCopy(s: string): string {
  return JSON.parse(JSON.stringify(s));
}
