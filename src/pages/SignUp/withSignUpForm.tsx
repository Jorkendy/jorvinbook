import React, { useState, FC, SyntheticEvent } from "react";
import get from "lodash/get";
import { useHistory } from "react-router-dom";

import { SignUpProps } from "./SignUp";
import utils from "../../utils";

const { Routes } = utils;

export const withSignUpForm = (WrappedComponent: FC<SignUpProps>) => {
  return () => {
    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
    const [showPassword, setShowPassword] = useState(false)
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
    }

    const _onSubmit = () => {
        console.log("Form data: ", form);
    }

    const _onTogglePassword = () => {
        setShowPassword(!showPassword)
    }

    const _handleMouseDownPassword = (event: SyntheticEvent) => {
        event.preventDefault()
    }

    return (
      <WrappedComponent
        firstName={get(form, "firstName", "")}
        lastName={get(form, "lastName", "")}
        email={get(form, "email", "")}
        password={get(form, "password", "")}
        onChange={_onFormChange}
        navigateToSignIn={_navigateToSignIn}
        onSubmit={_onSubmit}
        showPassword={showPassword}
        onTogglePassword={_onTogglePassword}
        handleMouseDownPassword={_handleMouseDownPassword}
      />
    );
  };
};
