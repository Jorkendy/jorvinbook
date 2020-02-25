import get from "lodash/get";
import { Dispatch } from "redux";

import {
  GetCurrentUser,
  GetCurrentUserSuccess,
  GetCurrentUserFailure,
  UpdateCurrentUser,
  UpdateCurrentUserSuccess,
  UpdateCurrentUserFailure,
  UpdateApp
} from "../types";
import { User } from "../../interfaces/user.interface";
import service from "../../services/service";

export const onGetCurrentUser = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GetCurrentUser });
      const response = await service.getProfile();
      const user = get(response, "data.user", null);
      return dispatch({ type: GetCurrentUserSuccess, user });
    } catch (error) {
      return dispatch({ type: GetCurrentUserFailure, error });
    }
  };
};

export const onUpdateCurrentUser = (user: User) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: UpdateCurrentUser });
      await service.updateProfile(user);
      dispatch({ type: UpdateApp, field: "user", value: user });
      return dispatch({ type: UpdateCurrentUserSuccess, user });
    } catch (error) {
      return dispatch({ type: UpdateCurrentUserFailure, error });
    }
  };
};
