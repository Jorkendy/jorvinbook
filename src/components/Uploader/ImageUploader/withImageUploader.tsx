import React, { FC, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { ImageUploaderProps } from "./ImageUploader";

interface ImageUploaderWrapper {
  onUploadSuccess: (file: any) => void;
}

export const withImageUploader = (WrappedComponent: FC<ImageUploaderProps>) => {
  return ({ onUploadSuccess }: ImageUploaderWrapper) => {
    const [open, setOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");
    const [droppedImage, setDroppedImage] = useState();

    const onDrop = useCallback((acceptedFiles: Array<File>) => {
      setOpen(true);
      setImgSrc(URL.createObjectURL(acceptedFiles[0]));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const _onCloseCropImageDialog = () => {
      setOpen(false);
    };

    const _onSaveCroppedImage = (file: any) => {
      console.log(file);
    };

    return (
      <WrappedComponent
        open={open}
        getRootProps={getRootProps}
        getInputProps={getInputProps}
        onClose={_onCloseCropImageDialog}
        imgSrc={imgSrc}
        onSaveCroppedImage={_onSaveCroppedImage}
      />
    );
  };
};
