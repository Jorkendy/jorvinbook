import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { reducer } from "../redux/store";
import { Routes } from "../utils/routes";

interface AuthRouteProps {
  component: any;
  isAuthenticated: boolean;
  exact: boolean;
  path: string;
}

const AuthRoute: FC<AuthRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated ? (
          <Redirect to={Routes.SignIn} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state: reducer /*, ownProps*/) => {
  const { appReducer } = state;

  return {
    isAuthenticated: appReducer.isAuthenticated
  };
};

export default connect(mapStateToProps)(AuthRoute);
