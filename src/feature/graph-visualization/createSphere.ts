import { ICustomObjectFactoryParams } from './../../types/factories';
import SpriteText from 'three-spritetext';
import { SphereGeometry, MeshLambertMaterial, Mesh, Object3D } from 'three';
import { ITheme } from './../../model';
import { NodeObject } from 'react-force-graph-3d';

const CONFIG = {
  nodeResolution: 20,
};

export function makeCreateSphere({
  colors,
  highlightedSubGraph,
}: ICustomObjectFactoryParams) {
  return function createSphere({ id }: NodeObject) {
    const sphere = new SphereGeometry(
      10,
      CONFIG.nodeResolution,
      CONFIG.nodeResolution
    );

    const isInHilightedSubGraph = highlightedSubGraph.nodes.find(
      (node) => id === node.id
    );

    const material = new MeshLambertMaterial({
      color: isInHilightedSubGraph ? colors.accent : colors.primary,
      transparent: true,
      opacity: 0.75,
    });

    const textSprite = new SpriteText(String(id), 8, colors.text);
    const sphereMesh = new Mesh(sphere, material);

    const composedObject = new Object3D();
    composedObject.add(sphereMesh);
    composedObject.add(textSprite);

    return composedObject;
  };
}
