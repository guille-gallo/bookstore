export enum ErrorCode {
  SOMETHING_WENT_WRONG = '0001',
}

export function failRandomly() {
  return Math.random() > 0.7;
}