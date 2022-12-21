import { Component, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Router from "../Router";
import apolloClient from "../../apollo";

class App extends Component {
  public render(): ReactNode {
    return (
      <ApolloProvider client={apolloClient}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
