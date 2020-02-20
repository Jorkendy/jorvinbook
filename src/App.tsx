import React from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import utils from "./utils";
import SignIn from "./pages/SignIn";

const { styles, theme: themeObject } = utils;
const { Container } = styles;

const theme = createMuiTheme(themeObject as ThemeOptions);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container>
          <Switch>
            <Route exact path="/sign-in" component={SignIn} />
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
