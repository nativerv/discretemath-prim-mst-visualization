import { mapMatrix } from './mapMatrix';

export function addWeightsMatrixToAdjacencyMatrix(
  adjacencyMatrix: number[][],
  weightMatrix: number[][]
) {
  // Для каждого ребра, если оно есть,
  // записать вместо единицы вес из матрицы весов, если этот вес входит в матрицу,
  // иначе 1
  return mapMatrix(
    adjacencyMatrix,
    (cell, [i, j]) => cell && (weightMatrix[i]?.[j] ?? 1)
  );
}
