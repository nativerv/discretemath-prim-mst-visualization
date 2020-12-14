import { createBlankMatrix } from './createBlankMatrix';
import { mapMatrix } from './mapMatrix';

export function fitMatrixToAnother(
  matrixToFit: number[][],
  matrixToFitTo: number[][],
  fillWith = 1
) {
  const blankMatrix = createBlankMatrix(matrixToFitTo.length, fillWith);

  return mapMatrix(blankMatrix, (cell, [i, j]) =>
    i === j ? 0 : matrixToFit[i]?.[j] ?? cell
  );
}
