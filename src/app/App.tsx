import React from 'react';
import './App.css';
import ForceGraph3D from 'react-force-graph-3d';
import ForceGraph2D, {
  NodeObject,
  ForceGraphProps,
} from 'react-force-graph-2d';
import { SphereGeometry, Mesh, MeshLambertMaterial, Object3D } from 'three';
import { Event } from 'effector-logger';
import { useStore } from 'effector-react';
import {
  $colors,
  $mode,
  $graph,
  $gvDividers,
  $gvName,
  $gvSize,
  toggleTheme,
  toggleMode,
  setSize,
  loadGraphFromGV,
  loadGraphFromFile,
  setName,
  setDividers,
  fxLoadGraphFromFile,
} from '../model';
import SpriteText from 'three-spritetext';

const CONFIG = {
  nodeResolution: 20,
};

function App() {
  const colors = useStore($colors);
  const mode = useStore($mode);
  const graph = useStore($graph);

  const name = useStore($gvName);
  const size = useStore($gvSize);
  const dividers = useStore($gvDividers);

  function createCircle(
    { id, x, y }: { id?: number | string; x: number; y: number },
    ctx: CanvasRenderingContext2D,
    globalScale: number
  ) {
    const fontSize = 12;

    const text = String(id);

    ctx.fillStyle = colors.background;
    ctx.strokeStyle = colors.primary;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

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

    const textSprite = new SpriteText(String(id), 8, colors.text);
    const sphereMesh = new Mesh(sphere, material);

    const composedObject = new Object3D();
    composedObject.add(sphereMesh);
    composedObject.add(textSprite);

    return composedObject;
  }

  const params: ForceGraphProps = {
    graphData: graph,
    backgroundColor: colors.background,
    nodeColor: () => colors.primary,
    linkColor: () => colors.secondary,
    linkWidth: 2,
  };

  function makeHandleChange(setter: Event<string>) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setter(e.currentTarget.value);
    };
  }

  return (
    <div className="App">
      <button onClick={toggleTheme}>Theme</button>
      <button onClick={toggleMode}>Mode</button>

      <input type="file" onChange={fxLoadGraphFromFile} />
      <button onClick={loadGraphFromFile}>Load From File</button>
      <br />
      <label htmlFor="name">Имя: </label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={makeHandleChange(setName)}
      />
      <label htmlFor="size">Размер: </label>
      <input
        type="text"
        name="size"
        value={size}
        onChange={makeHandleChange(setSize)}
      />
      <label htmlFor="dividers">Делители: </label>
      <input
        type="text"
        name="dividers"
        value={dividers}
        onChange={makeHandleChange(setDividers)}
      />
      <button onClick={loadGraphFromGV}>Load From GV</button>

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
