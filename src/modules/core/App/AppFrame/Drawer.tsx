import { FC } from "react";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PublicIcon from '@mui/icons-material/Public';
import SavingsIcon from '@mui/icons-material/Savings';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import ListItemButton from "@mui/material/ListItemButton";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DrawerLink from "./DrawerLink";
import { drawerWidth } from "./constants";

interface Props {
  open: boolean;
  toggleDrawer: () => void;
}

const DrawerView = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
    }),
  },
}));

const CollapseIcon = styled(KeyboardDoubleArrowRightIcon)<{ open: boolean }>(
  ({ theme, open }) => ({
    "&": {
      transform: "rotate(180deg)",
      transition: theme.transitions.create("transform", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      ...(!open && {
        transform: "rotate(0deg)",
        transition: theme.transitions.create("transform", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }),
    },
  })
);

const Drawer: FC<Props> = ({ open, toggleDrawer }) => {
  return (
    <DrawerView variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      />
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        <DrawerLink to="/gas-usage">
          <ListItemIcon>
            <LocalGasStationIcon />
          </ListItemIcon>
          <ListItemText primary="Gas Usage" />
        </DrawerLink>
        <DrawerLink to="/validators-map">
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Validators Map" />
        </DrawerLink>
        <DrawerLink to="/community-wallets">
          <ListItemIcon>
            <SavingsIcon />
          </ListItemIcon>
          <ListItemText primary="Community Wallets" />
        </DrawerLink>
      </List>

      <Divider />
      <List>
        <ListItemButton onClick={toggleDrawer}>
          <ListItemIcon>
            <CollapseIcon open={open} />
          </ListItemIcon>
          <ListItemText primary="Collapse sidebar" />
        </ListItemButton>
      </List>
    </DrawerView>
  );
};

export default Drawer;
