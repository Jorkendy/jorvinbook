import { Dispatch } from "redux";
import get from "lodash/get";

import service from "../../services/service";
import { Verify, VerifySuccess, VerifyFailure, UpdateApp } from "../types";
import { history } from "../../App";
import { Routes } from "../../utils/routes";

export const onVerifyToken = (callback: Function) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: Verify });
      const response = await service.verifyToken();
      const user = get(response, "data.user", {});
      dispatch({ type: UpdateApp, field: "isAuthenticated", value: true });
      dispatch({ type: UpdateApp, field: "user", value: user });
      return dispatch({ type: VerifySuccess });
    } catch (error) {
      callback({
        errorMessage: get(
          error,
          "response.data.message",
          "Something went wrong. Please try again later!"
        )
      });
      return dispatch({ type: VerifyFailure, error });
    }
  };
};

export const onSignOut = () => {
  return async (dispatch: Dispatch) => {
    service.clearToken();
    dispatch({ type: UpdateApp, field: "isAuthenticated", value: false });
    dispatch({ type: UpdateApp, field: "user", value: null });
    history.push(Routes.SignIn);
  };
};
