import { IThemes } from '../types/modelTypes';

export const DEFAULT_ADJACENCY_MATRIX = [
  [0, 2, 5, 9, 0, 0, 0],
  [2, 0, 2, 0, 7, 0, 0],
  [5, 2, 0, 1, 4, 3, 0],
  [9, 0, 1, 0, 0, 4, 0],
  [0, 7, 4, 0, 0, 1, 5],
  [0, 0, 3, 4, 1, 0, 7],
  [0, 0, 0, 0, 5, 7, 0],
];

export const THEMES: IThemes = {
  dark: {
    primary: 'white',
    background: 'black',
    secondary: 'lightgrey',
    text: 'darkgrey',
    accent: 'red',
  },
  light: {
    primary: 'black',
    background: 'white',
    secondary: 'black',
    text: 'darkgrey',
    accent: 'red',
  },
};