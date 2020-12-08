import { createEvent, createStore } from 'effector';
import { generateRandomTree } from '../lib/generateRandomTree';

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
    secondary: 'grey',
  },
  light: {
    primary: 'black',
    background: 'white',
    secondary: 'black',
  },
};

export const toggleTheme = createEvent<React.MouseEvent>();
export const toggleMode = createEvent<React.MouseEvent>();

export const $theme = createStore<keyof IThemes>('dark').on(
  toggleTheme,
  (theme) => (theme === 'dark' ? 'light' : 'dark')
);
export const $mode = createStore<TDisplayMode>('3D').on(toggleMode, (mode) =>
  mode === '3D' ? '2D' : '3D'
);

export const $colors = $theme.map((theme) => THEMES[theme]);
export const $graph = createStore(generateRandomTree());

// ========================================
