export interface ITheme {
  primary: string;
  background: string;
  secondary: string;
  text: string;
  accent: string;
}

export interface IThemes {
  dark: ITheme;
  light: ITheme;
}

export type TDisplayMode = '3D' | '2D';
