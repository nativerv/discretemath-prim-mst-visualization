import { ICustomObjectFactoryParams } from '../../types/factoryTypes';
import SpriteText from 'three-spritetext';
import * as d3 from 'd3';
import {
  LineBasicMaterial,
  Vector3,
  BufferGeometry,
  Object3D,
  Line,
  BufferAttribute,
  VertexColors,
} from 'three';
import { LinkObject } from 'react-force-graph-3d';

export function makeCreateLink3D({
  colors,
  highlightedSubGraph,
}: ICustomObjectFactoryParams) {
  return function createLink3D(link: LinkObject) {
    // extend link with text sprite
    // @ts-ignore
    const { weight } = link;

    const textSprite = new SpriteText(`${weight}`);
    textSprite.color = colors.primary;
    textSprite.backgroundColor = 'transparent';
    textSprite.textHeight = 5;

    const composedObject = new Object3D();
    composedObject.add(textSprite);

    return composedObject;
  };
}
