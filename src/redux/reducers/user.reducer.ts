import {
  GetCurrentUser,
  GetCurrentUserSuccess,
  GetCurrentUserFailure,
  UpdateCurrentUser,
  UpdateCurrentUserSuccess,
  UpdateCurrentUserFailure
} from "../types";

const initialState = {
  isLoading: false,
  user: null,
  errorMessage: ""
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GetCurrentUser:
    case UpdateCurrentUser:
      return {
        ...state,
        isLoading: true
      };
    case GetCurrentUserSuccess:
    case UpdateCurrentUserSuccess:
      return {
        ...state,
        isLoading: false,
        user: action.user
      };
    case GetCurrentUserFailure:
    case UpdateCurrentUserFailure:
      return {
        ...state,
        isLoading: false,
        errorMessage: "Error"
      };
    default:
      return state;
  }
};

export default userReducer;
