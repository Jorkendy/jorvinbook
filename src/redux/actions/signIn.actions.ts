import { Dispatch } from "redux";

import { SignIn, SignInSuccess, SignInFailure } from "../types";
import { SignUpUser } from "../../interfaces/signUpUser.interface";
import service from "../../services/service";

export const onSignIn = (credential: SignUpUser) => {
  return async (dispatch: Dispatch) => {
    console.log(credential);
    // try {
    //   dispatch({ type: SignIn });
    //   const response = await service.signUp(credential);
    //   console.log(response);
    // } catch (error) {
    //   return dispatch({ type: SignInFailure, error });
    // }
  };
};
