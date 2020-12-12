import { GraphData } from 'react-force-graph-2d';
import { ITheme } from './modelTypes';

export interface ICustomObjectFactoryParams {
  colors: ITheme;
  highlightedSubGraph: GraphData;
}
