import type { FC } from "react";
import { Navigate } from "react-router";

const Root: FC = () => {
  return (
    <Navigate to="/gas-usage" replace={true} />
  );
};

export default Root;
