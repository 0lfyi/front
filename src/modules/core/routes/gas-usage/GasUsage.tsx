import { FC } from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import GasUsageChart from "../../../graphs/components/GasUsageChart";

const GasUsage: FC = () => {
  return (
    <Box p={2}>
      <Paper>
        <GasUsageChart />
      </Paper>
    </Box>
  );
};

export default GasUsage;
