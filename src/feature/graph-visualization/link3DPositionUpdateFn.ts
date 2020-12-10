import { Object3D } from 'three';

interface Coords {
  x: number;
  y: number;
  z: number;
}

export function link3DPositionUpdateFn(
  sprite: Object3D,
  { start, end }: { start: Coords; end: Coords }
) {
  const middlePos = Object.assign(
    // @ts-ignore
    ...['x', 'y', 'z'].map((c) => ({
      // @ts-ignore
      [c]: start[c] + (end[c] - start[c]) / 2,
    }))
  );

  // Position sprite
  Object.assign(sprite.position, middlePos);

  return false;
}
