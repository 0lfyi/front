import { FC, ReactNode } from "react";
import {
  Link as RouterLink,
  useResolvedPath,
  useMatch,
} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";

interface Props {
  to: string;
  children: ReactNode;
}

const DrawerLink: FC<Props> = ({ to, children }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: !true });

  return (
    <ListItemButton component={RouterLink} to={to} selected={match !== null}>
      {children}
    </ListItemButton>
  );
};

export default DrawerLink;
