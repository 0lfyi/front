import { FC, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "./AppBar";
import Drawer from "./Drawer";

const AppFrame: FC = () => {
  const [open, setOpen] = useState(false);
  const main = useRef<HTMLElement>(null);

  const { pathname } = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    main.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar />
        <Drawer open={open} toggleDrawer={toggleDrawer} />
        <Box
          ref={main}
          component="main"
          sx={{
            backgroundColor: (theme) => theme.palette.grey[50],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Box display="flex" minHeight="100%">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AppFrame;
