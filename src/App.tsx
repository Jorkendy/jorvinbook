import React, { FC } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import utils from "./utils";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home";
import Spinner from "./components/Spinner";
import AuthRoute from "./components/AuthRoute";
import UserProfile from "./pages/UserProfile/UserProfile";
import Header from "./components/Header/Header";
import { withApp } from "./withApp";

export interface AppProps {
  isLoading: boolean;
  isAuthenticated: boolean;
}

const { styles, theme: themeObject, Routes } = utils;
const { Container } = styles;
const theme = createMuiTheme(themeObject as ThemeOptions);
export const history = createBrowserHistory();

const App: FC<AppProps> = ({ isLoading, isAuthenticated }) => {
  return (
    <ThemeProvider theme={theme}>
      {isLoading ? <Spinner /> : null}
      <Router history={history}>
        <Switch>
          <Route exact path={Routes.SignIn} component={SignIn} />
          <Route exact path={Routes.SignUp} component={SignUp} />
          <Container>
            <Header />
            <Route exact path={Routes.Home} component={Home} />
            <AuthRoute exact path={Routes.Profile} component={UserProfile} />
          </Container>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default withApp(App);
