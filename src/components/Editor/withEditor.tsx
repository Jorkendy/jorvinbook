import React, { useState, FC } from "react";
import { connect } from "react-redux";

import { reducer } from "../../redux/store";
import { onUpload } from "../../redux/actions/document.actions";
import { EditorProps } from "./Editor";

interface ConnectEditor {
  onUpload: (formData: any) => void;
  isLoading: boolean;
}

export interface UploadResponse {
  isSuccess: boolean;
  error?: any;
  fileUrl?: string;
}

const mapStateToProps = (state: reducer /*, ownProps*/) => {
  const { documentReducer } = state;

  return {
    isLoading: documentReducer.isLoading
  };
};

const mapDispatchToProps = { onUpload };

export const withEditor = (WrappedComponent: FC<EditorProps>) => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(({ onUpload, isLoading }: ConnectEditor) => {
    const [value, setValue] = useState("");

    const _onChange = (content: any, editor: any) => {
      console.log("Content was updated:", content);
      setValue(content);
    };

    const _onUpload = async (blobInfo: any) => {
      let formData = new FormData();
      formData.append("formData", blobInfo.blob());
      const response = await onUpload(formData);
      return response;
    };

    return (
      <WrappedComponent
        value={value}
        onChange={_onChange}
        onUpload={_onUpload}
      />
    );
  });
};
