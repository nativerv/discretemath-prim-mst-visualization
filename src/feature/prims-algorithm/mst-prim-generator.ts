/**
 * Range from 0..N exclusive (0..N-1)
 * @param N end index, exclusive
 */
const range = (N: number) => [...Array(N).keys()];

export function* mstPrimGen(
  adjacencyMatrix: number[][],
  weightMatrix: number[][]
) {
  const N = adjacencyMatrix.length;
  const vertices = range(N);
  const reached = [];
  const unreached = [...vertices];
  const solution: [number, number][] = [];

  reached.push(unreached[0]);
  unreached.splice(0, 1);

  while (unreached.length > 0) {
    let min = Number.MAX_SAFE_INTEGER;
    let rIndex = 0;
    let uIndex = 0;

    for (var i = 0; i < reached.length; i++) {
      for (var j = 0; j < unreached.length; j++) {
        const weight = weightMatrix[reached[i]]?.[unreached[j]] ?? 1;
        const isAdjacent = adjacencyMatrix[reached[i]][unreached[j]] !== 0;

        if (weight < min && isAdjacent) {
          min = weight;
          rIndex = i;
          uIndex = j;
        }
      }
    }

    solution.push([reached[rIndex] + 1, unreached[uIndex] + 1]);

    yield solution;

    reached.push(unreached[uIndex]);
    unreached.splice(uIndex, 1);
  }

  return solution;
}
