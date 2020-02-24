import { Dispatch } from "redux";
import get from "lodash/get";

import { SignIn, SignInSuccess, SignInFailure, UpdateApp } from "../types";
import { BasicUser } from "../../interfaces/basicUser.interface";
import service from "../../services/service";

export const onSignIn = (credential: BasicUser, callback: Function) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: SignIn });
      const response = await service.signIn(credential);
      const token = get(response, "data.token", "");
      const user = get(response, "data.user", {});
      service.saveToken(token);
      dispatch({ type: UpdateApp, field: "isAuthenticated", value: true });
      dispatch({ type: UpdateApp, field: "user", value: user });
      callback();
      return dispatch({ type: SignInSuccess });
    } catch (error) {
      callback({
        errorMessage: get(
          error,
          "response.data.message",
          "Something went wrong. Please try again later!"
        )
      });
      return dispatch({ type: SignInFailure, error });
    }
  };
};
