import React, { FC, SyntheticEvent } from "react";
import styled from "styled-components";
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
import FormHelperText from "@material-ui/core/FormHelperText";
import { Helmet } from "react-helmet";

import { useStyles } from "../SignIn/SignIn";
import Copyright from "../../components/Copyright";
import { withSignUpForm } from "./withSignUpForm";
import PasswordInput from "../../components/PasswordInput";
import Spinner from "../../components/Spinner";
import Dialog from "../../components/ConfirmSignUpDialog";

export interface SignUpProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  onChange: (event: SyntheticEvent) => void;
  navigateToSignIn: () => void;
  onSubmit: (event: SyntheticEvent) => void;
  errorMessage: string;
  isLoading: boolean;
  open: boolean;
  onClose: () => void;
}

const SignUp: FC<SignUpProps> = ({
  firstName,
  lastName,
  email,
  password,
  onChange,
  navigateToSignIn,
  onSubmit,
  errorMessage,
  isLoading,
  open,
  onClose
}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      {open ? <Dialog open={open} onClose={onClose} /> : null}
      {isLoading ? <Spinner /> : null}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign Up</title>
      </Helmet>
      <CssBaseline />
      <Wrapper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit} method="post">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordInput password={password} onChange={onChange} />
            </Grid>
          </Grid>
          {errorMessage ? (
            <FormHelperText error>{errorMessage}</FormHelperText>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" component="span" onClick={navigateToSignIn}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Wrapper>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default withSignUpForm(SignUp);

const Wrapper = styled.div``;
