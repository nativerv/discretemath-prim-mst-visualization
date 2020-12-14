export function matrixToPrettyString(matrix: number[][]) {
  let shape = [matrix.length, matrix[0].length];

  function col(mat: number[][], i: number) {
    return mat.map((row) => row[i]);
  }
  let colMaxes: number[] = [];
  for (let i = 0; i < shape[1]; i++) {
    colMaxes.push(
      Math.max.apply(
        null,
        col(matrix, i).map((n) => n.toString().length)
      )
    );
  }

  const stringRows: string[][] = [];

  matrix.forEach((row) => {
    stringRows.push(
      row.map((val, j) => {
        return (
          new Array(colMaxes[j] - val.toString().length + 1).join(' ') +
          val.toString() +
          '  '
        );
      })
    );
  });

  return stringRows.join('\n');
}
