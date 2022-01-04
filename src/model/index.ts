i/media/media_container_z/Edu/3sem/КДМ/Ind/webmport {
  combine,
  createEffect,
  createEvent,
  createStore,
  restore,
  sample,
} from 'effector-logger';
import { GraphData } from 'react-force-graph-2d';
import { addWeightsMatrixToD3Graph } from '../lib/addWeightsMatrixToD3Graph';
import { createBlankMatrix } from '../lib/createBlankMatrix';
import { fitMatrixToAnother } from '../lib/fitMatrixToAnother';
import { GV } from '../lib/GV';
import {
  ILink,
  mapAdjacencyAndWeightMatrixToD3Graph,
} from '../lib/mapAdjacencyMatrixToD3Graph';
import { mapCsvToMatrix } from '../lib/mapCsvToMatrix';
import { IThemes, TDisplayMode } from '../types/modelTypes';
import { THEMES } from './defaults';
import { fileLoadHandler } from './effect-handlers/fileLoadHandler';
import { toggle } from './reducers/toggle';

// Ивенты для переключения темы и режима 2D/3D
export const toggleTheme = createEvent<React.MouseEvent>();
export const toggleMode = createEvent<React.MouseEvent>();

// Ивенты для различных меню
export const toggleAdjacencyMatrixModal = createEvent<React.MouseEvent>();
export const toggleWeightMatrixModal = createEvent<React.MouseEvent>();
export const toggleListingModal = createEvent<React.MouseEvent>();
export const toggleActions = createEvent<React.MouseEvent>();

// Ивенты для загрузки графа
export const loadGraphFromGV = createEvent<React.MouseEvent>();
export const loadAdjacencyMatrixFromFile = createEvent<React.MouseEvent>();
export const loadWeightMatrixFromFile = createEvent<React.MouseEvent>();

export const addNodeToGraph = createEvent<React.MouseEvent>();
export const removeLastNodeFromGraph = createEvent<React.MouseEvent>();

// Ивенты для GV
export const setName = createEvent<string>();
export const setSize = createEvent<string>();
export const setDividers = createEvent<string>();

export const setAdjacencyMatrix = createEvent<number[][]>();
export const setWeightMatrix = createEvent<number[][]>();

// Ивенты для листинга
export const setListingString = createEvent<string>();

// Ивенты относящиеся к подсветке остовного дерева
export const setHilightedSubGraph = createEvent<GraphData>();
export const toggleIsHighlighted = createEvent<void>();
export const setComponentsCount = createEvent<number>();
export const setIsolatedNodes = createEvent<number[]>();

// Эффект для загрузки матрицы смежности из файла
export const fxLoadAdjacencyMatrixFromFile = createEffect({
  handler: fileLoadHandler,
});

export const fxLoadWeightMatrixFromFile = createEffect({
  handler: fileLoadHandler,
});

// Сторы для темы и режима
export const $theme = createStore<keyof IThemes>('dark').on(
  toggleTheme,
  (theme) => (theme === 'dark' ? 'light' : 'dark')
);
export const $mode = createStore<TDisplayMode>('3D').on(toggleMode, (mode) =>
  mode === '3D' ? '2D' : '3D'
);
export const $colors = $theme.map((theme) => THEMES[theme]);

export const $isAdjacencyMatrixModalOpened = createStore(false).on(
  toggleAdjacencyMatrixModal,
  toggle
);

export const $isWeightMatrixModalOpened = createStore(false).on(
  toggleWeightMatrixModal,
  toggle
);

export const $isListingModalOpened = createStore(false).on(
  toggleListingModal,
  toggle
);

export const $isActionsMinimised = createStore(false).on(toggleActions, toggle);

// Сторы для подсветки остовного дерева
export const $isHighlighted = createStore<boolean>(false).on(
  toggleIsHighlighted,
  toggle
);

export const $listingString = restore<string>(setListingString, '');

export const $weightMatrixFileContents = restore<string>(
  fxLoadWeightMatrixFromFile.doneData,
  ''
);
export const $adjacencyMatrixFileContents = restore<string>(
  fxLoadAdjacencyMatrixFromFile.doneData,
  ''
);

export const $adjacencyMatrix = restore<number[][]>(setAdjacencyMatrix, [[]])
  .on(addNodeToGraph, (state) =>
    state[0].length === 0
      ? [[0]]
      : fitMatrixToAnother(state, createBlankMatrix(state.length + 1, 0), 0)
  )
  .on(removeLastNodeFromGraph, (state) =>
    state.length === 1
      ? [[]]
      : fitMatrixToAnother(state, createBlankMatrix(state.length - 1, 0), 0)
  );
export const $weightMatrix = restore<number[][]>(setWeightMatrix, [
  [],
]).on($adjacencyMatrix, (state, payload) =>
  payload.length === state.length
    ? state
    : payload.length > state.length
    ? fitMatrixToAnother(state, payload)
    : state.slice(0, payload.length).map((row) => row.slice(0, payload.length))
);

export const $componentsCount = restore<number>(setComponentsCount, 0);
export const $isolatedNodes = restore<number[]>(setIsolatedNodes, []);
export const $hilightedSubGraph = restore<GraphData>(setHilightedSubGraph, {
  links: [],
  nodes: [],
}).reset($adjacencyMatrix, $weightMatrix);

// GV сторы
export const $gvName = restore(setName, 'Иванов Иван Иванович');
export const $gvSize = restore(setSize, '7');
export const $gvDividers = restore(setDividers, '2 3');

// Основной стор с D3 графом
export const $graph = combine(
  $adjacencyMatrix,
  $weightMatrix
).map(([adjacencyMatrix, weightMatrix]) =>
  mapAdjacencyAndWeightMatrixToD3Graph(adjacencyMatrix, weightMatrix)
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
