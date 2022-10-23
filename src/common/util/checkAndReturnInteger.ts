// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function checkAndReturnInteger(i: any): number {
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
