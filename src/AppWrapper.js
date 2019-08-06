import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

import AuthProvider from "./setup/AuthProvider";
import theme from "setup/theme";
import Router from "setup/Router";
import Frame from "components/Frame";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Frame>
            <Router />
          </Frame>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
