import { mapMatrix } from '../../lib/mapMatrix';

export function editInMatrix(
  matrix: number[][],
  [i, j]: [number, number],
  newValue: number
) {
  return mapMatrix(matrix, (value, [Mi, Mj]) =>
    (Mi === i && Mj === j) || (Mi === j && Mj === i) ? newValue : value
  );
}
