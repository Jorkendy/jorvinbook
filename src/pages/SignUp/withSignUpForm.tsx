import React, { useState, FC, SyntheticEvent } from "react";
import get from "lodash/get";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { SignUpProps } from "./SignUp";
import { SignUpUser } from "../../interfaces/signUpUser.interface";
import utils from "../../utils";
import { onSignUp } from "../../redux/actions/signUp.actions";
import { reducer } from "../../redux/store";

interface ConnectSignUpForm {
  onSignUp: (credential: SignUpUser, callback: Function) => void;
  isLoading: boolean;
}

interface SignUpResponse {
  errorMessage: string;
}

const { Routes, validateName, validateEmail, isEmpty } = utils;
const mapStateToProps = (state: reducer /*, ownProps*/) => {
  const { signUpReducer } = state;

  return {
    isLoading: signUpReducer.isLoading
  };
};

const mapDispatchToProps = { onSignUp };

export const withSignUpForm = (WrappedComponent: FC<SignUpProps>) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(({ onSignUp, isLoading }: ConnectSignUpForm) => {
    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const [open, setOpen] = useState(false);

    const _onFormChange = (event: SyntheticEvent) => {
      const field = get(event, "target.name", "default_field");
      const value = get(event, "target.value", "default_name");
      setForm({
        ...form,
        [field]: value
      });
    };

    const _navigateToSignIn = () => {
      history.push(Routes.SignIn);
    };

    const _validateForm = () => {
      const firstName = get(form, "firstName", "");
      const lastName = get(form, "lastName", "");
      const email = get(form, "email", "");
      const password = get(form, "password", "");
      const isFirstNameValid = !isEmpty(firstName) && validateName(firstName);
      const isLastnameValid = !isEmpty(lastName) && validateName(lastName);
      const isEmailValid = !isEmpty(email) && validateEmail(email);
      const isPasswordValid = !isEmpty(password);
      return (
        isFirstNameValid && isLastnameValid && isEmailValid && isPasswordValid
      );
    };

    const _onSubmit = (event: SyntheticEvent) => {
      if (event) {
        event.preventDefault();
      }
      if (!_validateForm()) {
        setErrorMessage("Please fill all field with valid data");
        return;
      } else {
        setErrorMessage("");
        onSignUp(form, (response: SignUpResponse) => {
          if (response) {
            setErrorMessage(response.errorMessage)
            return;
          }
          setOpen(true);
        });
      }
    };

    const _onClose = () => {
      setOpen(false);
      history.push(Routes.Home);
    };

    return (
      <WrappedComponent
        firstName={get(form, "firstName", "")}
        lastName={get(form, "lastName", "")}
        email={get(form, "email", "")}
        password={get(form, "password", "")}
        onChange={_onFormChange}
        navigateToSignIn={_navigateToSignIn}
        onSubmit={_onSubmit}
        errorMessage={errorMessage}
        isLoading={isLoading}
        open={open}
        onClose={_onClose}
      />
    );
  });
};
