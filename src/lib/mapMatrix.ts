export function mapMatrix<TFrom, TTo>(
  matrix: TFrom[][],
  callback: (value: TFrom, [i, j]: [number, number]) => TTo
): TTo[][] {
  return matrix.map((row, i) => row.map((cell, j) => callback(cell, [i, j])));
}
