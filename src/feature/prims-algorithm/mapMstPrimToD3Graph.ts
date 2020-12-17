import { uniqBy } from 'lodash';

export function mapMstPrimToD3Graph(mstComponents: number[][][]) {
  const links = mstComponents.flatMap((component, i) =>
    component.map(([source, target]) => ({
      source: source,
      target: target,
      component: i,
    }))
  );

  // Маппим массив компонент графа с парами вершин (рёбер)
  // в уникальные вершины задействованные в этих рёбрах плюс номер компоненты
  const nodes = uniqBy(
    mstComponents.flatMap((component, i) =>
      component.flatMap(([source, target]) => [
        { id: source, component: i },
        { id: target, component: i },
      ])
    ),
    'id'
  );

  return { nodes, links };
}
