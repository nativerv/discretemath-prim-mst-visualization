import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ForceGraph3D from 'react-force-graph-3d';
import ForceGraph2D, {
  NodeObject,
  ForceGraphProps,
} from 'react-force-graph-2d';
import {
  SphereGeometry,
  Mesh,
  MeshLambertMaterial,
  TextGeometry,
  Font,
  Object3D,
} from 'three';
import { createEffect, createEvent, createStore } from 'effector-logger';
import { useStore } from 'effector-react';
import {
  $colors,
  $mode,
  $graph,
  toggleTheme,
  toggleMode,
  fxLoadGraphFromFile,
  $fileContents,
} from '../model';
import { mapCsvToMatrix } from '../lib/mapCsvToMatrix';
import SpriteText from 'three-spritetext';

const CONFIG = {
  nodeResolution: 20,
};

function App() {
  const colors = useStore($colors);
  const mode = useStore($mode);
  const graph = useStore($graph);

  function createCircle(
    { id, x, y }: { id?: number | string; x: number; y: number },
    ctx: CanvasRenderingContext2D,
    globalScale: number
  ) {
    
    const fontSize = 12 / globalScale;
    
    const text = String(id);
    
    ctx.fillStyle = colors.background;
    ctx.strokeStyle = colors.primary;
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath()
    
    ctx.textBaseline = 'middle';
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = colors.primary;
    ctx.fillText(text, x, y);
  }

  function createSphere({ id }: NodeObject) {
    const sphere = new SphereGeometry(
      10,
      CONFIG.nodeResolution,
      CONFIG.nodeResolution
    );

    const material = new MeshLambertMaterial({
      color: colors.primary,
      transparent: true,
      opacity: 0.75,
    });

    const textSprite = new SpriteText(String(id), 8, colors.primary);
    const sphereMesh = new Mesh(sphere, material);

    const composedObject = new Object3D();
    composedObject.add(sphereMesh);
    composedObject.add(textSprite);

    return composedObject;
  }

  function handleLoadFromFile() {
    /* ... */
  }

  const params: ForceGraphProps = {
    graphData: graph,
    backgroundColor: colors.background,
    nodeColor: () => colors.primary,
    linkColor: () => colors.secondary,
    linkWidth: 2
  };

  return (
    <div className="App">
      <button onClick={toggleTheme}>Theme</button>
      <button onClick={toggleMode}>Mode</button>

      <input type="file" onChange={fxLoadGraphFromFile} />
      <button onClick={handleLoadFromFile}>Mode</button>

      {mode === '3D' ? (
        <ForceGraph3D {...params} nodeThreeObject={createSphere} />
      ) : (
        <ForceGraph2D
          {...params}
          nodeColor={colors.primary}
          nodeCanvasObjectMode={() => 'after'}
          nodeCanvasObject={createCircle as any}
        />
      )}
    </div>
  );
}

export default App;
