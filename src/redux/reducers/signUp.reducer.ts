import { SignUp, SignUpSuccess, SignUpFailure } from "../types";

const initialState = {
  isLoading: false,
  isSuccess: null
};

const signUpReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SignUp:
      return {
        ...state,
        isLoading: true
      };
    case SignUpSuccess:
      return {
        ...state,
        isLoading: false,
        isSuccess: true
      };
    case SignUpFailure:
      return {
        ...state,
        isLoading: false,
        isSuccess: false
      };
    default:
      return state;
  }
};

export default signUpReducer;