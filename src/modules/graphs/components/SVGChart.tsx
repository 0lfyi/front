import type { FC, PropsWithChildren } from 'react';
import { createContext, cloneElement, ReactElement } from 'react';
import * as d3 from 'd3';
import SVG from '../../svg';

interface PaddingDef {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface Domain {
  x: [number, number];
  y: [number, number];
}

type Props = PropsWithChildren<{
  width: number;
  height: number;
  domain: Domain;
  containerComponent?: ReactElement;
}>;

interface IChartContext {
  contentWidth: number;
  contentHeight: number;
  xAccessor: (value: [number, number]) => number;
  yAccessor: (value: [number, number]) => number;
  domain: Domain;
  x: d3.ScaleLinear<number, number>;
  y: d3.ScaleLinear<number, number>;
  padding: PaddingDef;
}

export const SVGChartContext = createContext<IChartContext>(undefined as never);

const Frame: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <>{children}</>;
};

const SVGChart: FC<Props> = ({ width, height, children, domain, ...props }) => {
  const containerComponent = props.containerComponent || <Frame />;

  const contentWidth = width;
  const contentHeight = height;

  const xAccessor = (value: [number, number]): number => value[1];
  const yAccessor = (value: [number, number]): number => value[0];

  let x = d3.scaleLinear().range([0, contentWidth]);
  if (domain && domain.x) {
    x = x.domain(domain.x);
  }

  let y = d3.scaleLinear().range([contentHeight, 0]);
  if (domain && domain.y) {
    y = y.domain(domain.y);
  }

  const contextValue = {
    contentWidth,
    contentHeight,
    xAccessor,
    yAccessor,
    domain,
    x,
    y,
    padding: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  };

  return (
    <SVG width={width} height={height}>
      <SVGChartContext.Provider value={contextValue}>
        {cloneElement(containerComponent, {}, children)}
      </SVGChartContext.Provider>
    </SVG>
  );
};

export default SVGChart;
