import { FC } from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from '@mui/icons-material/GitHub';
import Box from "@mui/material/Box";

const Container = styled(MuiAppBar)(({ theme }) => ({
  position: "absolute",
  backdropFilter: "blur(20px)",
  background: "rgba(255, 255, 255, 0.7) none repeat scroll 0% 0%",
  color: "rgb(45, 56, 67)",
  boxShadow: "none",
  borderStyle: "solid",
  borderColor: theme.palette.divider,
  borderWidth: "0px 0px thin",
}));

const AppBar: FC = () => {
  return (
    <Container>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <Box display="flex" sx={{ flexGrow: 1 }} justifyContent="center">
        </Box>
        <IconButton
          color="inherit"
          component="a"
          href="https://github.com/0lfyi/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </Container>
  );
};

export default AppBar;
