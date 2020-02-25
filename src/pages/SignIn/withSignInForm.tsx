import React, { useState, FC, SyntheticEvent } from "react";
import get from "lodash/get";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { SignInProps } from "./SignIn";
import { BasicUser } from "../../interfaces/basicUser.interface";
import utils from "../../utils";
import { onSignIn } from "../../redux/actions/signIn.actions";
import { reducer } from "../../redux/store";

interface ConnectSignUpForm {
  onSignIn: (credential: BasicUser, callback: Function) => void;
  isLoading: boolean;
}

interface SignUpResponse {
  errorMessage: string;
}

const { Routes, validateEmail, isEmpty } = utils;
const mapStateToProps = (state: reducer /*, ownProps*/) => {
  const { signInReducer } = state;

  return {
    isLoading: signInReducer.isLoading
  };
};

const mapDispatchToProps = { onSignIn };

export const withSignInForm = (WrappedComponent: FC<SignInProps>) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(({ onSignIn, isLoading }: ConnectSignUpForm) => {
    const [form, setForm] = useState({
      email: "",
      password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();

    const _onFormChange = (event: SyntheticEvent) => {
      const field = get(event, "target.name", "default_field");
      const value = get(event, "target.value", "default_name");
      setForm({
        ...form,
        [field]: value
      });
    };

    const _navigateToSignUp = () => {
      history.push(Routes.SignUp);
    };

    const _validateForm = () => {
      const email = get(form, "email", "");
      const password = get(form, "password", "");
      const isEmailValid = !isEmpty(email) && validateEmail(email);
      const isPasswordValid = !isEmpty(password);
      return isEmailValid && isPasswordValid;
    };

    const _onSubmit = () => {
      if (!_validateForm()) {
        setErrorMessage("Please fill all field with valid data");
        return;
      } else {
        setErrorMessage("");
        onSignIn(form, (response: SignUpResponse) => {
          if (response) {
            setErrorMessage(response.errorMessage);
            return;
          }
          history.push(Routes.Home);
        });
      }
    };

    const _onKeyDown = (event: SyntheticEvent) => {
      const isEnterKey = parseInt(get(event, "keyCode", 0), 10) === 13;
      if (isEnterKey) {
        _onSubmit()
      }
    };

    return (
      <WrappedComponent
        email={get(form, "email", "")}
        password={get(form, "password", "")}
        onChange={_onFormChange}
        navigateToSignUp={_navigateToSignUp}
        onSubmit={_onSubmit}
        onKeyDown={_onKeyDown}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
    );
  });
};
