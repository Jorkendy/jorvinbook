import get from "lodash/get";
import { Dispatch } from "redux";

import {
  GetCurrentUser,
  GetCurrentUserSuccess,
  GetCurrentUserFailure
} from "../types";
// import { User } from "../../interfaces/user.interface";
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
