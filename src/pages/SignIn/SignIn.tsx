import React, { FC, SyntheticEvent } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { Helmet } from "react-helmet";
import FormHelperText from "@material-ui/core/FormHelperText";

import Copyright from "../../components/Copyright";
import Spinner from "../../components/Spinner";
import { withSignInForm } from "./withSignInForm";

export interface SignInProps {
  email: string;
  password: string;
  isLoading: boolean;
  errorMessage: string;
  navigateToSignUp: () => void;
  onChange: (event: SyntheticEvent) => void;
  onSubmit: () => void;
  onKeyDown: (event: SyntheticEvent) => void;
}

export const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  margin: {
    // margin: theme.spacing(1),
  },
  textField: {
    width: "100%"
  }
}));

const SignIn: FC<SignInProps> = ({
  email,
  password,
  isLoading,
  errorMessage,
  onChange,
  navigateToSignUp,
  onSubmit,
  onKeyDown
}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      {isLoading ? <Spinner /> : null}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign In</title>
      </Helmet>
      <CssBaseline />
      <Wrapper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          {errorMessage ? (
            <FormHelperText error>{errorMessage}</FormHelperText>
          ) : null}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" component="span" onClick={navigateToSignUp}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </div>
      </Wrapper>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default withSignInForm(SignIn);

const Wrapper = styled.div``;
