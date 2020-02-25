import { Dispatch } from "redux";
import get from "lodash/get";

import { Upload, UploadSuccess, UploadFailure } from "../types";
import service from "../../services/service";

export const onUpload = (formData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: Upload });
      const response = await service.uploadFile(formData);
      dispatch({ type: UploadSuccess });
      return get(response, "data", { isSuccess: false });
    } catch (error) {
      dispatch({ type: UploadFailure, error });
      return { isSuccess: false, error };
    }
  };
};
