import { createBlankMatrix } from './createBlankMatrix';
import { mapMatrix } from './mapMatrix';

export function fitMatrixToAnother(
  matrixToFit: number[][],
  matrixToFitTo: number[][]
) {
  const blankMatrix = createBlankMatrix(matrixToFitTo.length, 1);

  return mapMatrix(blankMatrix, (cell, [i, j]) =>
    i === j ? 0 : matrixToFit[i]?.[j] ?? cell
  );
}
