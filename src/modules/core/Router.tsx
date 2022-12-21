import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import AppFrame from "./App/AppFrame";
import NotFound from "./routes/not-found";
import GasUsage from "./routes/gas-usage";
import ValidatorsMap from "./routes/validators-map";
import Root from "./routes/root";

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AppFrame />}>
        <Route index element={<Root  />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/gas-usage" element={<GasUsage />} />
        <Route path="/validators-map" element={<ValidatorsMap />} />
      </Route>
    </Routes>
  );
};

export default Router;