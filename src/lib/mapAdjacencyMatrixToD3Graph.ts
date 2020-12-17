import { mapMatrix } from './mapMatrix';

export interface ILink {
  source: number;
  target: number;
  weight: number;
}

export function mapAdjacencyAndWeightMatrixToD3Graph(
  adjacencyMatrix: number[][],
  weightMatrix: number[][]
) {
  const nodes = adjacencyMatrix[0].map((row, i) => ({ id: i }));
  const links = mapMatrix(adjacencyMatrix, (cell, [i, j]) =>
    cell
      ? [
          {
            source: i,
            target: j,
            weight: weightMatrix[i]?.[j] ?? 1,
          },
        ]
      : []
  ).flat(2);

  return { nodes, links };
}
