import { GraphData } from 'react-force-graph-2d';

export function addWeightsMatrixToD3Graph(
  { nodes, links }: GraphData,
  weightMatrix: number[][]
) {
  return {
    nodes,
    // Добавляем вес, если он есть в матрице весов для текущего ребра, иначе 1
    links: links.map((link) => ({
      ...link,
      // @ts-ignore
      weight: weightMatrix[link.source.id - 1]?.[link.target.id - 1] ?? 1,
    })),
  };
}
