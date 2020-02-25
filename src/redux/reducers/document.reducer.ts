import { Upload, UploadSuccess, UploadFailure } from "../types";

const initialState = {
  isLoading: false,
  isSuccess: null
};

const documentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Upload:
      return {
        ...state,
        isLoading: true
      };
    case UploadSuccess:
      return {
        ...state,
        isLoading: false,
        isSuccess: true
      };
    case UploadFailure:
      return {
        ...state,
        isLoading: false,
        isSuccess: false
      };
    default:
      return state;
  }
};

export default documentReducer;
