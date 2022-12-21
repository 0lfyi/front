import type { FC } from 'react';
import { useRef, SVGProps } from 'react';
import { Defs } from './components';
import Context from './Context';

interface Props extends SVGProps<SVGSVGElement> {
  width: number;
  height: number;
}

const Provider: FC<Props> = ({ width, height, children, ...props }) => {
  const defs = useRef<Defs>(null);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...props}>
      <Defs ref={defs} />
      <Context.Provider
        value={{
          defs: () => defs.current as Defs,
          width,
          height,
        }}
      >
        {children}
      </Context.Provider>
    </svg>
  );
};

export default Provider;
