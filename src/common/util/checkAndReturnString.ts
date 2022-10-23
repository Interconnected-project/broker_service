// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function checkAndReturnString(s: any): string {
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
