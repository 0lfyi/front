import { FC } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { Config, Plot } from "@influxdata/giraffe";
import { DATA } from './data'

const getDataTable = () => DATA;

const GasUsage: FC = () => {
  const table = getDataTable();

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
      <Typography variant="h3">Gas Used</Typography>
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
