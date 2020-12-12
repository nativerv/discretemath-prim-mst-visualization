import { mapMatrix } from './mapMatrix';

export interface ILink {
  source: number;
  target: number;
  weight: number;
}

export function mapAdjacencyMatrixToD3Graph(matrix: number[][]) {
  const nodes = matrix.map((row, i) => ({ id: i + 1 }));
  const links = mapMatrix(matrix, (cell, [i, j]) =>
    cell
      ? [
          {
            source: i + 1,
            target: j + 1,
            weight: 1,
          },
        ]
      : []
  ).flat(2);

  return { nodes, links };
}
