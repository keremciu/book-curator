import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useAuthContext } from "setup/AuthProvider";
import { Home, Discovery, Book } from "pages";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authData } = useAuthContext();
  return (
    <Route
      {...rest}
      render={props =>
        authData.user_id ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const Router = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <PrivateRoute path="/discovery" component={Discovery} />
    <PrivateRoute path="/book/:id" component={Book} />
    <Route path="*" component={() => "NOT FOUND"} />
  </Switch>
);

export default Router;
