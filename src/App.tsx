import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from 'history';

import store from "./redux/store";
import utils from "./utils";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home";

const { styles, theme: themeObject, Routes } = utils;
const { Container } = styles;
const theme = createMuiTheme(themeObject as ThemeOptions);
export const history = createBrowserHistory();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router history={history}>
          <Container>
            <Switch>
              <Route exact path={Routes.SignIn} component={SignIn} />
              <Route exact path={Routes.SignUp} component={SignUp} />
              <Route exact path={Routes.Home} component={Home} />
            </Switch>
          </Container>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
