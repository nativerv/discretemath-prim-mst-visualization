import {
  createEffect,
  createEvent,
  createStore,
  setStoreName,
} from 'effector-logger';
import { generateRandomTree } from '../lib/generateRandomTree';
import { mapAdjacencyMatrixToD3Graph } from '../lib/mapAdjacencyMatrixToD3Graph';
import { mapCsvToMatrix } from '../lib/mapCsvToMatrix';

interface ITheme {
  primary: string;
  background: string;
  secondary: string;
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
  },
  light: {
    primary: 'black',
    background: 'white',
    secondary: 'darkgrey',
  },
};

export const toggleTheme = createEvent<React.MouseEvent>('toggleTheme');
export const toggleMode = createEvent<React.MouseEvent>('toggleMode');
export const loadGraphFromFile = createEvent<React.MouseEvent>(
  'loadGraphFromFile'
);
export const loadGraphFromGV = createEvent<React.MouseEvent>('loadGraphFromGV');

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

export const $graph = $fileContents
  .map(mapCsvToMatrix)
  .map(mapAdjacencyMatrixToD3Graph);

$graph.watch(console.log);

setStoreName($graph, '$graph');
