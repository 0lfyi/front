import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box py={4} component="main">
        <Typography variant="body1" align="center">
          This page doesn&apos;t exists.{" "}
          <Link component={RouterLink} to="/">
            Go to the home page
          </Link>
          .
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFound;
