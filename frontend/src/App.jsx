import React from "react";
import { ThemeProvider } from "styled-components";
import { CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { lightTheme } from "./styles";
import { MainView } from "./pages";

const App = () => {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <MuiThemeProvider theme={lightTheme}>
          <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
            <CssBaseline />
            <MainView />
          </SnackbarProvider>
        </MuiThemeProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
