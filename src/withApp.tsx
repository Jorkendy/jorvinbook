import React, { useEffect, FC } from "react";
import { connect } from "react-redux";

import { onVerifyToken } from "./redux/actions/app.actions";
import { reducer } from "./redux/store";
import { Routes } from "./utils/routes";
import { AppProps, history } from "./App";

interface ConnectApp {
  onVerifyToken: (callback: Function) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface Response {
  errorMessage: string;
}

const mapStateToProps = (state: reducer /*, ownProps*/) => {
  const { appReducer } = state;

  return {
    isLoading: appReducer.isLoading,
    isAuthenticated: appReducer.isAuthenticated
  };
};

const mapDispatchToProps = { onVerifyToken };

export const withApp = (WrappedComponent: FC<AppProps>) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(({ onVerifyToken, isLoading, isAuthenticated }: ConnectApp) => {
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        onVerifyToken((response: Response) => {
          if (response) {
            history.push(Routes.SignIn);
          }
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <WrappedComponent
        isLoading={isLoading}
        isAuthenticated={isAuthenticated}
      />
    );
  });
};
