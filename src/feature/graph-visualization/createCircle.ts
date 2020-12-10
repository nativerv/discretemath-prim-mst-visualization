import { ICustomObjectFactoryParams } from './../../types/factories';
import { ITheme } from '../../model';

export function makeCreateCircle({
  colors,
  highlightedSubGraph,
}: ICustomObjectFactoryParams) {
  return function createCircle(
    { id, x, y }: { id?: number | string; x: number; y: number },
    ctx: CanvasRenderingContext2D,
    globalScale: number
  ) {
    const fontSize = 12;

    const text = String(id);

    const isInHilightedSubGraph = highlightedSubGraph.nodes.find(
      (node) => id === node.id
    );

    ctx.fillStyle = isInHilightedSubGraph ? colors.accent : colors.background;
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
  };
}
