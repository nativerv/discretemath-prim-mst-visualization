import { chunk } from 'lodash';

export function validateMst(
  mst: number[][],
  adjacencyMatrix: number[][]
): [number[][][], number] {
  const mstWithSeparatedComponents = mst
    .flatMap((link) => [
      adjacencyMatrix[link[0]][link[1]] !== 0 ? [link] : [':'],
    ])
    .flat()
    .join()
    .split(':')
    .map((string) => string.split(','))
    .map((componentString) =>
      componentString.filter((char) => char !== '').map(Number)
    )
    .map((componentArray) => chunk(componentArray, 2))
    .filter((component) => component.length !== 0);

  const componentsCount = mstWithSeparatedComponents.length;

  return [mstWithSeparatedComponents, componentsCount];
}
