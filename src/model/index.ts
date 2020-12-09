import {
  combine,
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from 'effector-logger';
import { GraphData } from 'react-force-graph-2d';
import { GV } from '../lib/GV';
import { mapAdjacencyMatrixToD3Graph } from '../lib/mapAdjacencyMatrixToD3Graph';
import { mapCsvToMatrix } from '../lib/mapCsvToMatrix';

interface ITheme {
  primary: string;
  background: string;
  secondary: string;
  text: string;
}

interface IThemes {
  dark: ITheme;
  light: ITheme;
}

type TDisplayMode = '3D' | '2D';

export const THEMES: IThemes = {
  dark: {
    primary: 'white',
    background: 'black',
    secondary: 'lightgrey',
    text: 'darkgrey',
  },
  light: {
    primary: 'black',
    background: 'white',
    secondary: 'darkgrey',
    text: 'red',
  },
};

export const toggleTheme = createEvent<React.MouseEvent>('toggleTheme');
export const toggleMode = createEvent<React.MouseEvent>('toggleMode');
export const loadGraphFromFile = createEvent<React.MouseEvent>(
  'loadGraphFromFile'
);
export const loadGraphFromGV = createEvent<React.MouseEvent>('loadGraphFromGV');

export const setName = createEvent<string>('setName');
export const setSize = createEvent<string>('setSize');
export const setDividers = createEvent<string>('setDividers');

export const fxLoadGraphFromFile = createEffect({
  name: 'fxLoadGraphFromFile',
  handler: (changeEvent: React.ChangeEvent<HTMLInputElement>) =>
    new Promise<string>((resolve, reject) => {
      changeEvent.preventDefault();

      const reader = new FileReader();

      reader.onload = async (fileEvent) => {
        const text = fileEvent.target?.result;
        console.log('File loaded', { text });
        resolve(String(text));
      };

      const fileBlob = changeEvent.target.files?.[0];
      console.log({ fileBlob, files: changeEvent.target.files });

      if (fileBlob) {
        console.log('Begin loading file');
        reader.readAsText(fileBlob);
      } else {
        reject("Error: can't begin reading the file: file is null");
      }
    }),
});

export const $theme = createStore<keyof IThemes>('dark', {
  name: '$theme',
}).on(toggleTheme, (theme) => (theme === 'dark' ? 'light' : 'dark'));
export const $mode = createStore<TDisplayMode>('3D').on(toggleMode, (mode) =>
  mode === '3D' ? '2D' : '3D'
);

export const $colors = $theme.map((theme) => THEMES[theme]);

export const $fileContents = createStore<string>(`1 0 0\n0 0 1\n0 0 0`, {
  name: '$fileContents',
}).on(fxLoadGraphFromFile.doneData, (_, payload) => payload);

export const $gvName = restore(setName, 'Зайцев Евгений Александрович');

export const $gvSize = restore(setSize, '7');

export const $gvDividers = restore(setDividers, '2 3');

export const $graph = createStore<GraphData>(
  {
    links: [],
    nodes: [],
  },
  { name: '$graph' }
);

// Берём в графостор GV по инпутосторам по вызову loadGraphFromGV
sample({
  clock: loadGraphFromGV,
  source: combine($gvName, $gvSize, $gvDividers),
  fn: ([name, size, dividers]) =>
    mapAdjacencyMatrixToD3Graph(
      GV(
        name.replace(' ', ''),
        !isNaN(Number(size)) ? Number(size) : 7,
        dividers
          .split(' ')
          .map((divider) => (!isNaN(Number(divider)) ? Number(divider) : 1))
      ).adjacencyMatrix
    ),
  target: $graph,
});

// Берём в графостор данные из файлостора по вызову loadGraphFromFile
sample({
  clock: loadGraphFromFile,
  source: $fileContents,
  fn: (fileContents) =>
    mapAdjacencyMatrixToD3Graph(mapCsvToMatrix(fileContents)),
  target: $graph,
});
