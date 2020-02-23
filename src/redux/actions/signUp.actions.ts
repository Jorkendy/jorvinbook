import { Dispatch } from "redux";
import get from "lodash/get";

import { SignUp, SignUpSuccess, SignUpFailure } from "../types";
import { SignUpUser } from "../../interfaces/signUpUser.interface";
import service from "../../services/service";

export const onSignUp = (credential: SignUpUser, callback: Function) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: SignUp });
      await service.signUp(credential);
      callback();
      return dispatch({ type: SignUpSuccess });
    } catch (error) {
      callback({
        errorMessage: get(
          error,
          "response.data.message",
          "Something went wrong. Please try again later!"
        )
      });
      return dispatch({ type: SignUpFailure, error });
    }
  };
};
