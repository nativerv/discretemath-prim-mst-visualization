import { ICustomObjectFactoryParams } from '../../types/factoryTypes';
import { LinkObject } from 'react-force-graph-3d';

const SIZE = 30;

export function makeCreateLink2D({ colors }: ICustomObjectFactoryParams) {
  return (link: LinkObject, ctx: CanvasRenderingContext2D) => {
    const MAX_FONT_SIZE = 4;
    const LABEL_NODE_MARGIN = 10;

    const start = link.source;
    const end = link.target;

    // ignore unbound links
    if (typeof start !== 'object' || typeof end !== 'object') return;

    // calculate label positioning

    // @ts-ignore
    const textPos = Object.assign(
      // @ts-ignore
      ...['x', 'y'].map((c) => ({
        // @ts-ignore
        [c]: start[c] + (end[c] - start[c]) / 2, // calc middle point
      }))
    );

    // @ts-ignore
    const relLink = { x: end.x - start.x, y: end.y - start?.y };

    let textAngle = Math.atan2(relLink.y, relLink.x);
    // maintain label vertical orientation for legibility
    if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
    if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);

    // @ts-ignore
    const { weight } = link;

    const label = String(weight);
    const textWidth = ctx.measureText(label).width;

    // estimate fontSize to fit in link length
    const fontSize = SIZE / 1.5;
    ctx.font = `${fontSize}px Sans-Serif`;

    // draw text label (with background rect)
    ctx.save();
    ctx.translate(textPos.x, textPos.y);
    ctx.rotate(textAngle);

    ctx.fillStyle = colors.background;
    ctx.beginPath();
    ctx.rect(-2 - textWidth / 2, -10, textWidth + 4, 20);
    ctx.fill();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = colors.primary;
    ctx.fillText(label, 0, 0);
    ctx.restore();
  };
}
