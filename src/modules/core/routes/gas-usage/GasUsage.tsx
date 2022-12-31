import { FC, useEffect, useState } from "react";
import { Table } from "@influxdata/giraffe"
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Config, Plot } from "@influxdata/giraffe";
import { newTable } from './newTable';

const GasUsage: FC = () => {
  const [table, setTable] = useState<Table>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('https://api.0l.fyi/avg-gas-cost');
        const body: {
          _time: number[];
          _value: number[];
          volume: number[];
          type: string[];
        } = await res.json();
        console.log(body);

        const data = newTable(body._value.length)
          .addColumn('_time', 'dateTime:RFC3339', 'time', body._time)
          .addColumn('_value', 'system', 'number', body._value)
          .addColumn('type', 'string', 'string', body.type);

        setTable(data);
      } finally {
        setLoaded(true);
      }
    };

    load();
  }, []);

  if (!loaded) {
    return (
      <Box alignItems="center" justifyContent="center" width="100%" display="flex">
        <CircularProgress />
      </Box>
    );
  }

  const config: Config = {
    table,
    legendFont: "12px sans-serif",
    legendOpacity: 1,
    legendOrientationThreshold: 5,
    legendColorizeRows: true,
    legendHide: !true,
    tickFont: "10px sans-serif",
    showAxes: true,
    xScale: "linear",
    yScale: "linear",
    layers: [
      {
        type: "line",
        x: "_time",
        y: "_value",
        fill: ['type'],

        hoverDimension: "x",
        interpolation: "monotoneX",
        lineWidth: 1,
        shadeBelow: false,
        shadeBelowOpacity: 0.1,
        colors: [
          "#31C0F6",
          "#BC00B8",
          "#FF7E27"
        ],
      },
    ],
  };

  return (
    <Box p={2} width="100%" height="calc(100vh - 64px)" display="flex" flexDirection="column">
      <Typography variant="h3">Gas Usage</Typography>
      <Paper style={{ overflow: 'hidden', flex: 1, display: 'flex' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            padding: '20px',
            boxSizing: 'border-box',
            backgroundColor: 'black',
          }}
        >
          <Plot config={config} />
        </div>
      </Paper>
    </Box>
  );
};

export default GasUsage;
