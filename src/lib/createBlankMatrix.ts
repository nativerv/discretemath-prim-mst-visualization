import { createBlankArray } from './createBlankArray';

export const createBlankMatrix = (N: number, fillWith: number) =>
  createBlankArray(N, fillWith).map((row) => createBlankArray(N, fillWith));
