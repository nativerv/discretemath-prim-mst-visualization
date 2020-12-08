import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ForceGraph3D from 'react-force-graph-3d';
import ForceGraph2D, { NodeObject } from 'react-force-graph-2d';
import { SphereGeometry, Mesh, MeshLambertMaterial } from 'three';
import { createEffect, createEvent, createStore } from 'effector-logger';
import { useStore } from 'effector-react';
import { $colors, $mode, $graph, toggleTheme, toggleMode } from '../model';

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
