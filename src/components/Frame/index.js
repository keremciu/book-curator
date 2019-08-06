import React, { Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Chip from "@material-ui/core/Chip";
import { Link as RouterLink } from "react-router-dom";

import { Wrapper, MainContent } from "./styles";
import { useAuthContext } from "setup/AuthProvider";

const Frame = ({ children }) => {
  const { authData, onLogout } = useAuthContext();
  return (
    <Wrapper>
      <CssBaseline />
      <AppBar color="default" elevation={0}>
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Curator{" "}
              {authData.user_id && <Chip label={authData.access_type} />}
            </Typography>
            {authData.user_id ? (
              <Fragment>
                <Button component={RouterLink} to="/discovery">
                  Discovery
                </Button>
                <Button onClick={onLogout}>Logout</Button>
              </Fragment>
            ) : (
              <Button component={RouterLink} to="/">
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <MainContent>
        <Container maxWidth="md">{children}</Container>
      </MainContent>
    </Wrapper>
  );
};

export default Frame;
