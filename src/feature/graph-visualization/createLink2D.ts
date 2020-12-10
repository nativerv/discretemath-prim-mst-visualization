import { ICustomObjectFactoryParams } from './../../types/factories';
import { LinkObject } from 'react-force-graph-3d';

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

    const maxTextLength =
      Math.sqrt(Math.pow(relLink.x, 2) + Math.pow(relLink.y, 2)) -
      LABEL_NODE_MARGIN * 2;

    let textAngle = Math.atan2(relLink.y, relLink.x);
    // maintain label vertical orientation for legibility
    if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
    if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);

    // @ts-ignore
    const { weight } = link;
    const label = `${weight}`;

    // estimate fontSize to fit in link length
    ctx.font = '1px Sans-Serif';
    const fontSize = Math.min(
      MAX_FONT_SIZE,
      maxTextLength / ctx.measureText(label).width
    );
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2); // some padding

    // draw text label (with background rect)
    ctx.save();
    ctx.translate(textPos.x, textPos.y);
    ctx.rotate(textAngle);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    // ctx.fillRect(
    //   -bckgDimensions[0] / 2,
    //   -bckgDimensions[1] / 2,
    //   // @ts-ignore
    //   ...bckgDimensions
    // );
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
