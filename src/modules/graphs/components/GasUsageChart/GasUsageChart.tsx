import type { ReactElement } from 'react';
import { FC, useEffect, useRef, Component, createRef } from 'react';
import * as d3 from 'd3';
import Chart from '../Chart';
import data from './data';
import { D3ZoomEvent } from 'd3';
import _ from 'lodash';

const width = 800;
const height = 600;

const margin = { top: 20, right: 20, bottom: 30, left: 30 };

const xAccessor = (value: [number, number]): number => value[0];
const yAccessor = (value: [number, number]): number => value[1];

// const domainX = d3.extent(data.User, xAccessor) as [number, number];
const domainX: [number, number] = [1635348876077, 1671203938993];

const domainY = d3.extent(data.User, yAccessor) as [number, number];


const y = d3.scaleLinear()
  .domain(domainY)
  .nice()
  .range([height - margin.bottom, margin.top]);

const area = (data: any, x: any) => {
  return d3.area()
    .curve(d3.curveStepAfter)
    .x(d => x(d[0]))
    .y0(y(0))
    .y1(d => y(d[1]));
};

const xAxis = (g: any, x: any) => {
  g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
};

interface Props {}

class GasUsageChart extends Component<Props> {
  private data: [number, number][] = data.User;

  private initialized = false;

  private clipId = `__clip__::${Date.now()}`;

  private container = createRef<HTMLDivElement>();

  private svgEl = createRef<SVGSVGElement>();

  private pathEl = createRef<SVGPathElement>();

  private gx?: d3.Selection<SVGGElement, unknown, null, undefined>;
  private gxEl = createRef<SVGGElement>();

  private gyEl = createRef<SVGGElement>();

  private clipPathEl = createRef<SVGClipPathElement>();

  private path?: d3.Selection<SVGPathElement, [number, number][], null, undefined>;

  private domainX: [number, number] = domainX;

  private x = d3.scaleUtc()
    .domain(domainX)
    .range([margin.left, width - margin.right]);

  private scaledX = this.x;

  private loadData = _.debounce(async (domain: Date[]) => {
    console.log('loading', domain);
    const [from, to] = domain;

    const res = await fetch(
      `http://localhost:8081/avg-gas-cost?from=${from.getTime()}&to=${to.getTime()}`
    );
    const body = await res.json();
    this.data = body.data.User;

    this.domainX = body.data.domainX;

    this.x = d3.scaleUtc()
      .domain(this.domainX)
      .range([margin.left, width - margin.right]);

    console.log('ok');

    this.path!
      .datum(this.data)
      .attr(
        "d",
        d3.line()
          .x((d) => this.scaledX(xAccessor(d)))
          .y((d) => y(yAccessor(d)))
        // area(data, xz)
      );
  }, 2_000);

  private zoomed = (event: D3ZoomEvent<SVGSVGElement, [number, number][]>) => {
    console.log('event', event.transform);
    this.scaledX = event.transform.rescaleX(this.x);
    console.log('domain', this.scaledX.domain());
    this.path!
      .attr(
        "d",
        d3.line()
          .x((d) => this.scaledX(xAccessor(d)))
          .y((d) => y(yAccessor(d)))
        // area(data, xz)
      );
    this.gx!.call(xAxis, this.scaledX);

    this.loadData(this.scaledX.domain());
  };

  public constructor(props: Props) {
    super(props);

  }

  public componentDidMount() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    // const y = d3.scaleLinear()
    //   .domain([0, d3.max(data.User, yAccessor)]).nice()
    //   .range([height - margin.bottom, margin.top])

    const zoom = d3.zoom()
      .scaleExtent([1, 32])
      .extent([
        [margin.left, 0],
        [width - margin.right, height]
      ])
      .translateExtent([
        [margin.left, -Infinity],
        [width - margin.right, Infinity]
      ])
      .on("zoom", this.zoomed);

    const svg = d3.select(this.svgEl.current!)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height);

    const yAxis = (g: any, y: any) => {
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(null, "s"))
        .call((g: any) => g.select(".domain").remove())
        .call((g: any) => g.select(".tick:last-of-type text").clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .text("Gas Used"))
    };

    const contentWidth = width - margin.left - margin.right;
    const contentHeight = height - margin.top - margin.bottom;

    d3.select(this.clipPathEl.current)
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", contentWidth)
      .attr("height", contentHeight);

    this.path = d3.select(this.pathEl.current!)
      .datum(this.data)
      .attr(
        "d",
        d3.line()
          .x((d) => this.x(xAccessor(d)))
          .y((d) => y(yAccessor(d)))
      );

    this.gx = d3.select(this.gxEl.current!)
      .call(xAxis, this.x);

    d3.select(this.gyEl.current!)
      .call(yAxis, y);
    
    svg.call(zoom as any)
      .transition()
      .duration(750)
      .call(
        zoom.scaleTo as any,
        4,
        [
          this.x(Date.UTC(2001, 8, 1)),
          0
        ]
      );
  }

  public render(): ReactElement {
    return (
      <div ref={this.container}>
        <svg
          ref={this.svgEl}
          viewBox={`0,0,${width},${height}`}
          width={width}
          height={height}
        >
          <clipPath
            ref={this.clipPathEl}
            id={this.clipId}
          />

          <path
            ref={this.pathEl}
            clipPath={this.clipId}
            fill="none"
            stroke="steelblue"
            strokeWidth="1"
          />

          <g
            ref={this.gxEl}
          />

          <g
            ref={this.gyEl}
          />
        </svg>
      </div>
    );
  }
}

// const : FC = () => {
//   useEffect(() => {
//     const load = async () => {

//       console.log('svg', svg);
//     };
//     load();
//   }, []);

//   return (
//     <div>
//       <h1>GasUsageChart</h1>
//       <div ref={} />
//     </div>
//   );
// };

export default GasUsageChart;
