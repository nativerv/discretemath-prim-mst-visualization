import { mapMstPrimToD3Graph } from './mapMstPrimToD3Graph';
import { validateMst } from './validate-mst';

export {};

it('mapMstPrimToD3Graph', () => {
  const adjacencyMatrix = [
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
  ];

  const solution = [
    [1, 3],
    [3, 2],
    [1, 4],
    [4, 5],
    [5, 6],
    [1, 7],
    [7, 8],
    [8, 9],
    [9, 10],
  ].map((link) => link.map((x) => x - 1));

  const res = validateMst(solution, adjacencyMatrix);

  const subGraph = mapMstPrimToD3Graph(res);

  console.log(subGraph);
});
