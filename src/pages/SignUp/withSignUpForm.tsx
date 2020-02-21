import React, { useState, FC, SyntheticEvent } from "react";
import get from "lodash/get";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { SignUpProps } from "./SignUp";
import { SignUpUser } from "../../interfaces/signUpUser.interface";
import utils from "../../utils";
import { onSignIn } from "../../redux/actions/signIn.actions";

interface ConnectSignUpForm {
  onSignIn: (credential: SignUpUser) => void;
}

const { Routes, validateName, validateEmail, isEmpty } = utils;
const mapStateToProps = (state: any /*, ownProps*/) => {
  return {};
};

const mapDispatchToProps = { onSignIn };

export const withSignUpForm = (WrappedComponent: FC<SignUpProps>) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(({ onSignIn }: ConnectSignUpForm) => {
    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
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

    const _onSubmit = () => {
      if (!_validateForm()) {
        setErrorMessage("Please fill all field with valid data");
        return;
      } else {
        setErrorMessage("");
        onSignIn(form);
      }
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
        isLoading={false}
      />
    );
  });
};
