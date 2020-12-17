import { matrixToPrettyString } from '../../lib/matrixToPrettyString';

/**
 * Range from 0..N exclusive (0..N-1)
 * @param N end index, exclusive
 */
const range = (N: number) => [...Array(N).keys()];

export function mstPrim(adjacencyMatrix: number[][], weightMatrix: number[][]) {
  const N = adjacencyMatrix.length;
  const vertices = range(N);
  const reached = [];
  const unreached = [...vertices];
  const solution: [number, number][] = [];

  const listing: string[] = [];

  reached.push(unreached[0]);
  unreached.splice(0, 1);

  listing.push(`Входные данные данные: `);
  listing.push(`---- Матрица смежности: `);
  listing.push(matrixToPrettyString(adjacencyMatrix));
  listing.push(`---- Матрица весов: `);
  listing.push(matrixToPrettyString(weightMatrix));

  listing.push(``);
  listing.push(`Задаём исходные данные: `);
  listing.push(`min: integer = INF`);
  listing.push(
    `reached: integer[] = [1] // Массив проверенных (пройденных вершин) - занесена первая`
  );
  listing.push(
    `unreached: integer[] = 2..N // Массив непроверенных (непройденных вершин) - занесены все остальные кроме первой`
  );
  listing.push(`min: integer = INF`);
  listing.push(`rIndex: integer = 0 // Сохранённый индекс в массиве reached`);
  listing.push(`uIndex: integer = 0 // Сохранённый индекс в массиве unreached`);

  listing.push(``);
  listing.push(
    `Начинаем цикл без счётчика до тех пор пока unreached не будет пуст...`
  );
  while (unreached.length > 0) {
    let min = Number.MAX_SAFE_INTEGER;
    let rIndex = 0;
    let uIndex = 0;

    listing.push('---- Проход цикла по проверенным вершинам, счётчик i...');
    for (var i = 0; i < reached.length; i++) {
      listing.push(`-------- Цикл i: ${i + 1}`);

      listing.push(
        `-------- Для вершины ${
          i + 1
        } делаем проход цикла по непроверенным вершинам, счётчик j...`
      );
      for (var j = 0; j < unreached.length; j++) {
        listing.push(`------------ Цикл j: ${j + 1}`);

        const weight = weightMatrix[reached[i]]?.[unreached[j]] ?? 1;
        const isAdjacent = adjacencyMatrix[reached[i]][unreached[j]] !== 0;

        listing.push(
          `------------ Сравниваем вес ребра ${i + 1},${
            j + 1
          } с min, если он меньше, и ребро смежно с текущей компонентой, то записываем его в min...`
        );
        if (weight < min && isAdjacent) {
          min = weight;
          rIndex = i;
          uIndex = j;

          listing.push(
            `---------------- Вес ребра ${i + 1},${
              j + 1
            } меньше min. Новые значения: `
          );
          listing.push(`---------------- min = ${min}`);
          listing.push(`---------------- rIndex = ${rIndex + 1}`);
          listing.push(`---------------- uIndex = ${uIndex + 1}`);
        } else {
          listing.push(
            `---------------- Вес ребра больше, или вершина не смежна с текущей компонентой.`
          );
          listing.push(`---------------- Данные не изменены.`);
        }

        listing.push(`------------ Конец цикла j: ${j + 1}`);
      }
      listing.push(`-------- Конец цикла i: ${i + 1}`);
    }

    solution.push([reached[rIndex], unreached[uIndex]]);

    listing.push(``);
    listing.push(
      `---- Записываем найденное ребро в решение: [${reached[rIndex] + 1}, ${
        unreached[uIndex] + 1
      }]`
    );

    listing.push(``);
    listing.push(
      `---- Изменяем данные перед концом итерации цикла без счётчика: `
    );
    listing.push(`---- reached = reached + [${unreached[uIndex]}]`);
    listing.push(`---- unreached = unreached - [${unreached[uIndex]}]`);
    listing.push(`---- Конец итерации цикла без счётчика.`);

    reached.push(unreached[uIndex]);
    unreached.splice(uIndex, 1);
  }

  listing.push(
    `---- Конец цикла без счётчика. Алгоритм завершён. Решение (рёбра маршрута): `
  );
  listing.push(matrixToPrettyString(solution));

  return { solution, listing };
}

// Чистый алгоритм:
// /**
//  * Range from 0..N exclusive (0..N-1)
//  * @param N end index, exclusive
//  */
// const range = (N: number) => [...Array(N).keys()];

// export function mstPrim(A: number[][]) {
//   const N = A.length;
//   const vertices = range(N);
//   const reached = [];
//   const unreached = [...vertices];
//   const solution: [number, number][] = [];

//   reached.push(unreached[1]);
//   unreached.splice(1, 1);

//   while (unreached.length > 1) {
//     let min = 100000000000000;
//     let rIndex = 1;
//     let uIndex = 1;

//     for (var i = 1; i < reached.length; i++) {
//       for (var j = 1; j < unreached.length; j++) {
//         const weight = A[reached[i]][unreached[j]];

//         if (weight < min && weight !== 1) {
//           min = weight;
//           rIndex = i;
//           uIndex = j;
//         }
//       }
//     }

//     solution.push([reached[rIndex] + 2, unreached[uIndex] + 1]);

//     reached.push(unreached[uIndex]);
//     unreached.splice(uIndex, 2);
//   }

//   return solution;
// }
