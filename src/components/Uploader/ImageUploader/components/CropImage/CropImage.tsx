import React, { lazy, FC } from "react";
import "react-image-crop/dist/ReactCrop.css";

import { withCropImage } from "./withCropImage";

const Dialog = lazy(() => import("@material-ui/core/Dialog"));
const DialogActions = lazy(() => import("@material-ui/core/DialogActions"));
const DialogContent = lazy(() => import("@material-ui/core/DialogContent"));
const DialogTitle = lazy(() => import("@material-ui/core/DialogTitle"));
const Button = lazy(() => import("@material-ui/core/Button"));
const ReactCrop = lazy(() => import("react-image-crop"));

export interface CropImageProps {
  open: boolean;
  onClose: () => void;
  imgSrc: string;
  cropOptions: ReactCrop.Crop;
  onCropChange: (
    crop: ReactCrop.Crop,
    percentCrop: ReactCrop.PercentCrop
  ) => void;
  onImageLoaded: (target: HTMLImageElement) => void;
  onCropComplete: (crop: ReactCrop.Crop) => void;
  onSave: () => void
}

const CropImage: FC<CropImageProps> = ({
  open,
  onClose,
  imgSrc,
  cropOptions,
  onCropChange,
  onImageLoaded,
  onCropComplete,
  onSave
}) => {
  return (
    <Dialog
      maxWidth="xl"
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Set Thumbnail</DialogTitle>
      <DialogContent>
        {imgSrc && (
          <ReactCrop
            src={imgSrc}
            crop={cropOptions}
            ruleOfThirds
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
            onChange={onCropChange}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>Cancel</Button>
        <Button color="primary" autoFocus onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withCropImage(CropImage);
