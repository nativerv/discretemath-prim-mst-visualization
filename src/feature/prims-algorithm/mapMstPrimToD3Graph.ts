import { uniqBy } from 'lodash';

export function mapMstPrimToD3Graph(mst: [number, number][]) {
  const links = mst.map(([source, target]) => ({
    source,
    target,
  }));

  // Маппим пары вершин (рёбра) в уникальные вершины задействованные в этих рёбрах
  const nodes = uniqBy(
    mst.flatMap(([source, target]) => [{ id: source }, { id: target }]),
    'id'
  );

  return { nodes, links };
}
