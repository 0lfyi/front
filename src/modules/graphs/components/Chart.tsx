import type { FC, ReactNode } from 'react';
import * as d3 from 'd3';
import { SVGChartContext } from './SVGChart';

interface PaddingDef {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

export interface Domain {
  x: [number, number];
  y: [number, number];
}

interface Props {
  width: number;
  height: number;
  domain: Domain;
  padding?: PaddingDef;
  children: ReactNode;
}

const Chart: FC<Props> = ({
  width,
  height,
  children,
  domain,
  padding = { top: 0, left: 0, right: 0, bottom: 0 },
}) => {
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
      top: padding.top || 0,
      bottom: padding.bottom || 0,
      left: padding.left || 0,
      right: padding.right || 0,
    },
  };

  return (
    <div style={{ position: 'relative', width, height }}>
      <SVGChartContext.Provider value={contextValue}>{children}</SVGChartContext.Provider>
    </div>
  );
};

export default Chart;
