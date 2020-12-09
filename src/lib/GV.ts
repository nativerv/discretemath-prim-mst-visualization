const ALPHABET = Object.fromEntries(
  [
    'А',
    'Б',
    'В',
    'Г',
    'Д',
    'Е',
    'Ё',
    'Ж',
    'З',
    'И',
    'Й',
    'К',
    'Л',
    'М',
    'Н',
    'О',
    'П',
    'Р',
    'С',
    'Т',
    'У',
    'Ф',
    'Х',
    'Ц',
    'Ч',
    'Ш',
    'Щ',
    'Ъ',
    'Ы',
    'Ь',
    'Э',
    'Ю',
    'Я',
  ].map((letter, index) => [letter, letter === 'Ц' ? 21 : index + 1])
);

const getUniqueNumbersFromString = (inputString: string) =>
  [...new Set(inputString.toUpperCase().replace(' ', '').split(''))].map(
    (letter) => ALPHABET[letter]
  );

export const createBlankArray = (length: number) => Array(length).fill(0);

export const mapMatrix = (
  matrix: number[][],
  callback: (value: number, [i, j]: [number, number]) => number
) => matrix.map((row, i) => row.map((cell, j) => callback(cell, [i, j])));

const forEachMatrix = (
  matrix: number[][],
  callback: (value: number, [i, j]: [number, number]) => void
) =>
  matrix.forEach((row, i) => row.forEach((cell, j) => callback(cell, [i, j])));

export function GV(name: string, size: number, dividers: number[]) {
  const numbers = getUniqueNumbersFromString(name).slice(0, size);

  const blankMatrix = createBlankArray(numbers.length).map((row) =>
    createBlankArray(numbers.length)
  );

  // Вспомогательная матрица
  const helperMatrix = mapMatrix(blankMatrix, (value, [i, j]) =>
    Math.abs(numbers[j] - numbers[i])
  );

  //Матрица инцидентности
  const adjacencyMatrix = mapMatrix(helperMatrix, (value, [i, j]) =>
    Number(
      dividers.some((divider) => (value % divider === 0 && i !== j ? 1 : 0))
    )
  );

  return {
    helperMatrix,
    adjacencyMatrix,
  };
}

function prettyPrintMatrix(mat: number[][]) {
  let shape = [mat.length, mat[0].length];
  function col(mat: number[][], i: number) {
    return mat.map((row) => row[i]);
  }
  let colMaxes: number[] = [];
  for (let i = 0; i < shape[1]; i++) {
    colMaxes.push(
      Math.max.apply(
        null,
        col(mat, i).map((n) => n.toString().length)
      )
    );
  }

  mat.forEach((row) => {
    console.log.apply(
      null,
      row.map((val, j) => {
        return (
          new Array(colMaxes[j] - val.toString().length + 1).join(' ') +
          val.toString() +
          '  '
        );
      })
    );
  });
}

function adjMatrixToAdjList() {
  /* ... */
}

function encodeAdjacencyMatrix(matrix: number[][]) {
  return matrix
    .map((row) => row.map((value, j) => value && j).filter(Boolean))
    .flatMap((adjacents, i) => adjacents.map((adjacent) => [i, adjacent]));
}

// require.main === module &&
//   (() => {
//     const name = process.argv[2];
//     const size = Number(process.argv[3]);
//     const dividers = JSON.parse(process.argv[4]);
//     const { helperMatrix, adjacencyMatrix } = GV(name, size, dividers);

//     console.log('Цифры из ФИО: ', getUniqueNumbersFromString(name));

//     console.log();
//     console.log('Вспомогательная матрица: ');
//     prettyPrintMatrix(helperMatrix);

//     console.log();
//     console.log('Матрица смежности: ');
//     prettyPrintMatrix(adjacencyMatrix);

//     console.log();
//     console.log('Цифры для сайта: ');
//     encodeAdjacencyMatrix(adjacencyMatrix).forEach(([i, adjacent]) =>
//       console.log(i + 1, adjacent + 1)
//     );
//   })();
