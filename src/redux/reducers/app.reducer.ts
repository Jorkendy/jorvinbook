import { Verify, VerifySuccess, VerifyFailure, UpdateApp } from "../types";

const initialState = {
  isLoading: false,
  user: null,
  isAuthenticated: !!localStorage.getItem("token")
};

const appReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Verify:
      return {
        ...state,
        isLoading: true
      };
    case VerifySuccess:
      return {
        ...state,
        isLoading: false,
        isSuccess: true
      };
    case VerifyFailure:
      return {
        ...state,
        isLoading: false,
        isSuccess: false
      };
    case UpdateApp:
      return {
        ...state,
        [action.field]: action.value
      };
    default:
      return state;
  }
};

export default appReducer;
