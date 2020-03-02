import React, { lazy, FC } from "react";
import { DropzoneRootProps, DropzoneInputProps } from "react-dropzone";
import styled from "styled-components";

import { withImageUploader } from "./withImageUploader";

const CropImageDialog = lazy(() => import("./components/CropImage/CropImage"));

export interface ImageUploaderProps {
  open: boolean;
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  onClose: () => void;
  imgSrc: string;
  onSaveCroppedImage: (file: any) => void;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  open,
  getRootProps,
  getInputProps,
  onClose,
  imgSrc,
  onSaveCroppedImage
}) => {
  return (
    <div className="container">
      {open ? (
        <CropImageDialog
          open={open}
          onClose={onClose}
          imgSrc={imgSrc}
          onSaveCroppedImage={onSaveCroppedImage}
        />
      ) : null}
      <Container {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </Container>
    </div>
  );
};

const getColor = (props: {
  isDragAccept?: boolean;
  isDragReject?: boolean;
  isDragActive?: boolean;
}) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props: {
    isDragAccept?: boolean;
    isDragReject?: boolean;
    isDragActive?: boolean;
  }) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export default withImageUploader(ImageUploader);
