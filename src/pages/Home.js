import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { useAuthContext } from "setup/AuthProvider";
import ErrorMessage from "components/ErrorMessage";
import Loading from "components/Loading";
import { apiFetch } from "utils/useFetch";

const HomePage = ({ location }) => {
  const { onLogin, authData } = useAuthContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { from } = location.state || { from: { pathname: "/discovery" } };

  useEffect(() => {
    if (authData.access_type) {
      // it's waiting the response of ensureAuth then redirect to discovery
      setRedirectToReferrer(true);
    }
  }, [authData]);

  if (redirectToReferrer) return <Redirect to={from} />;
  if (loading) return <Loading isLoading />;
  if (error) return <ErrorMessage error={error} />;

  const handleLogin = async () => {
    setLoading(true);
    const [err, userData] = await apiFetch("auth", {
      method: "POST"
    });
    if (err) setError(err);
    if (userData.status === "success") {
      onLogin();
      setLoading(false);
      setRedirectToReferrer(true);
    }
  };

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ height: 400 }}
    >
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={handleLogin}
      >
        Login
      </Button>
    </Grid>
  );
};

export default HomePage;
