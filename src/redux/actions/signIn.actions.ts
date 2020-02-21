import { Dispatch } from "redux";
import get from "lodash/get";

import { SignIn, SignInSuccess, SignInFailure } from "../types";
import { SignUpUser } from "../../interfaces/signUpUser.interface";
import service from "../../services/service";

export const onSignIn = (credential: SignUpUser, callback: Function) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: SignIn });
      const response = await service.signUp(credential);
      const token = get(response, "data.token", "")
      service.saveToken(token);
      callback({ error: false });
      return dispatch({ type: SignInSuccess })
    } catch (error) {
      callback({ error: true })
      return dispatch({ type: SignInFailure, error });
    }
  };
};
