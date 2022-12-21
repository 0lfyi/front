import { createContext } from 'react';
import { SVGContext } from './types';

const Context = createContext<SVGContext>({
  width: 0,
  height: 0,
  defs: () => {
    throw new Error('Must be used in SVG');
  },
});

export default Context;
