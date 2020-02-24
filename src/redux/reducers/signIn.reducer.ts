import { SignIn, SignInSuccess, SignInFailure } from "../types";

const initialState = {
  isLoading: false,
  isSuccess: null,
  user: null
};

const signInReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SignIn:
      return {
        ...state,
        isLoading: true
      };
    case SignInSuccess:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.user
      };
    case SignInFailure:
      return {
        ...state,
        isLoading: false,
        isSuccess: false
      };
    default:
      return state;
  }
};

export default signInReducer;