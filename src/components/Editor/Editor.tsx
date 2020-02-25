import React, { FC } from "react";
import { Editor } from "@tinymce/tinymce-react";
import get from "lodash/get";

import { withEditor } from "./withEditor";

export interface EditorProps {
  value: string;
  onChange: (content: any, editor: any) => void;
  onUpload: (blobInfo: any) => void;
  config?: any;
}

const CustomEditor: FC<EditorProps> = ({
  value,
  onChange,
  onUpload,
  config = {}
}) => {
  return (
    <Editor
      apiKey={config.tinyApiKey}
      value={value}
      init={{
        width: "100%",
        height: 200,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount"
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | lignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat image| help",
        images_upload_handler: async (
          blobInfo: any,
          success: any,
          failure: any
        ) => {
          let response = await onUpload(blobInfo);
          const isSuccess = get(response, "isSuccess", false);
          if (isSuccess) {
            success(get(response, "fileUrl", ""));
          } else {
            failure("Error happen. Please try again");
          }
        },
        ...config
      }}
      onEditorChange={onChange}
    />
  );
};

export default withEditor(CustomEditor);
