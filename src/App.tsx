import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ForceGraph3D from 'react-force-graph-3d';
import ForceGraph2D, { NodeObject } from 'react-force-graph-2d';
import { SphereGeometry, Mesh, MeshLambertMaterial } from 'three';
import { createEffect, createEvent, createStore } from 'effector-logger';
import { useStore } from 'effector-react';

function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map((i) => ({ id: i })),
    links: [...Array(N).keys()]
      .filter((id) => id)
      .map((id) => ({
        [reverse ? 'target' : 'source']: id,
        [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1)),
      })),
  };
}

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

const THEMES: IThemes = {
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

const toggleTheme = createEvent<React.MouseEvent>();
const toggleMode = createEvent<React.MouseEvent>();

const $theme = createStore<keyof IThemes>('dark').on(toggleTheme, (theme) =>
  theme === 'dark' ? 'light' : 'dark'
);
const $mode = createStore<TDisplayMode>('3D').on(toggleMode, (mode) =>
  mode === '3D' ? '2D' : '3D'
);

const $colors = $theme.map((theme) => THEMES[theme]);
const $graph = createStore(genRandomTree());

// ========================================

function App() {
  const colors = useStore($colors);
  const mode = useStore($mode);
  const graph = useStore($graph);

  const createSphere = useCallback(
    function ({ id }: NodeObject) {
      const sphere = new SphereGeometry(10);
      const material = new MeshLambertMaterial({
        color: colors.primary,
        transparent: true,
        opacity: 0.75,
      });
      const mesh = new Mesh(sphere, material);

      return mesh;
    },
    [colors]
  );

  const params = {
    graphData: graph,
    backgroundColor: colors.background,
    nodeColor: colors.primary,
    linkColor: colors.secondary,
  };

  console.log({ secondary: colors.secondary });

  return (
    <div className="App">
      <button onClick={toggleTheme}>Theme</button>
      <button onClick={toggleMode}>Mode</button>
      {mode === '3D' ? (
        <ForceGraph3D {...params} nodeThreeObject={createSphere} />
      ) : (
        <ForceGraph2D {...params} nodeColor={colors.primary} />
      )}
    </div>
  );
}

export default App;
