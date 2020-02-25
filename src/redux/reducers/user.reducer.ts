import {
  GetCurrentUser,
  GetCurrentUserSuccess,
  GetCurrentUserFailure
} from "../types";

const initialState = {
  isLoading: false,
  user: null,
  errorMessage: ""
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GetCurrentUser:
      return {
        ...state,
        isLoading: true
      };
    case GetCurrentUserSuccess:
      return {
        ...state,
        isLoading: false,
        user: action.user
      };
    case GetCurrentUserFailure:
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
