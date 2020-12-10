/**
 * Range from 0..N exclusive (0..N-1)
 * @param N end index, exclusive
 */
const range = (N: number) => [...Array(N).keys()];

export function* mstPrimGen(A: number[][]) {
  const N = A.length;
  const vertices = range(N);
  const reached = [];
  const unreached = [...vertices];
  const solution: [number, number][] = [];

  reached.push(unreached[0]);
  unreached.splice(0, 1);

  while (unreached.length > 0) {
    let min = 99999999999999;
    let rIndex = 0;
    let uIndex = 0;

    for (var i = 0; i < reached.length; i++) {
      for (var j = 0; j < unreached.length; j++) {
        const weight = A[reached[i]][unreached[j]];

        if (weight < min && weight !== 0) {
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
