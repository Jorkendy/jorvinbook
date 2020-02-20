import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import utils from "./utils";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

const { styles, theme: themeObject, Routes } = utils;
const { Container } = styles;

const theme = createMuiTheme(themeObject as ThemeOptions);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
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
