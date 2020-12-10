import { GraphData } from 'react-force-graph-2d';
import { ITheme } from './../model/index';

export interface ICustomObjectFactoryParams {
  colors: ITheme;
  highlightedSubGraph: GraphData;
}
