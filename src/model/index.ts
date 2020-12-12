import {
  combine,
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from 'effector-logger';
import { GraphData } from 'react-force-graph-2d';
import { addWeightsMatrixToD3Graph } from '../lib/addWeightsMatrixToD3Graph';
import { GV } from '../lib/GV';
import {
  ILink,
  mapAdjacencyMatrixToD3Graph,
} from '../lib/mapAdjacencyMatrixToD3Graph';
import { mapCsvToMatrix } from '../lib/mapCsvToMatrix';
import { IThemes, TDisplayMode } from '../types/modelTypes';
import { THEMES } from './defaults';
import { fileLoadHandler } from './fileLoadHandler';


// Ивенты для переключения темы и режима 2D/3D
export const toggleTheme = createEvent<React.MouseEvent>('toggleTheme');
export const toggleMode = createEvent<React.MouseEvent>('toggleMode');

// Ивенты для загрузки графа
export const loadGraphFromGV = createEvent<React.MouseEvent>();
export const loadAdjacencyMatrixFromFile = createEvent<React.MouseEvent>();
export const loadWeightMatrixFromFile = createEvent<React.MouseEvent>();

// Ивенты для GV
export const setName = createEvent<string>('setName');
export const setSize = createEvent<string>('setSize');
export const setDividers = createEvent<string>('setDividers');

// Ивенты относящиеся к подсветке остовного дерева
export const setHilightedSubGraph = createEvent<GraphData>(
  'setHilightedSubGraph'
);
export const toggleIsHighlighted = createEvent<void>('toggleIsHighlighted');

// Эффект для загрузки матрицы смежности из файла
export const fxLoadAdjacencyMatrixFromFile = createEffect({
  name: 'fxLoadAdjacencyMatrixFromFile',
  handler: fileLoadHandler,
});

export const fxLoadWeightMatrixFromFile = createEffect({
  name: 'fxLoadWeightMatrixFromFile',
  handler: fileLoadHandler,
});

// Сторы для темы и режима
export const $theme = createStore<keyof IThemes>('dark', {
  name: '$theme',
}).on(toggleTheme, (theme) => (theme === 'dark' ? 'light' : 'dark'));
export const $mode = createStore<TDisplayMode>('3D').on(toggleMode, (mode) =>
  mode === '3D' ? '2D' : '3D'
);
export const $colors = $theme.map((theme) => THEMES[theme]);

// Сторы для подсветки остовного дерева
export const $isHighlighted = createStore<boolean>(false).on(
  toggleIsHighlighted,
  (state) => !state
);
export const $hilightedSubGraph = restore<GraphData>(setHilightedSubGraph, {
  links: [],
  nodes: [],
}).reset(loadAdjacencyMatrixFromFile, loadGraphFromGV);

export const $weightMatrixFileContents = restore<string>(
  fxLoadWeightMatrixFromFile.doneData,
  ''
);
export const $adjacencyMatrixFileContents = restore<string>(
  fxLoadAdjacencyMatrixFromFile.doneData,
  ''
);
export const $adjacencyMatrix = createStore<number[][]>([[]]);
export const $weightMatrix = createStore<number[][]>([[]]);

// GV сторы
export const $gvName = restore(setName, 'Зайцев Евгений Александрович');
export const $gvSize = restore(setSize, '7');
export const $gvDividers = restore(setDividers, '2 3');

// Основной стор с D3 графом
export const $graph = createStore<GraphData>(
  {
    links: [],
    nodes: [],
  },
  { name: '$graph' }
)
  .on($adjacencyMatrix, (state, payload) =>
    mapAdjacencyMatrixToD3Graph(payload)
  )
  .on($weightMatrix, (state, payload) =>
    addWeightsMatrixToD3Graph(state, payload)
  );

// Берём в графостор GV по инпутосторам по вызову loadGraphFromGV
sample({
  clock: loadGraphFromGV,
  source: combine($gvName, $gvSize, $gvDividers),
  fn: ([name, size, dividers]) =>
    GV(
      name.replace(' ', ''),
      !isNaN(Number(size)) ? Number(size) : 7,
      dividers
        .split(' ')
        .map((divider) => (!isNaN(Number(divider)) ? Number(divider) : 1))
    ).adjacencyMatrix,
  target: $adjacencyMatrix,
});

// Берём в графостор данные из файлостора по вызову loadGraphFromFile
sample({
  clock: loadAdjacencyMatrixFromFile,
  source: $adjacencyMatrixFileContents,
  fn: mapCsvToMatrix,
  target: $adjacencyMatrix,
});

sample({
  clock: loadWeightMatrixFromFile,
  source: $weightMatrixFileContents,
  fn: mapCsvToMatrix,
  target: $weightMatrix,
});
