import { Defs } from './components';

export type SVGContext = {
  width: number;
  height: number;
  defs: () => Defs;
};
