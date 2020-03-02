import React, { FC, useState, lazy } from "react";

import { CropImageProps } from "./CropImage";

const ReactCrop = lazy(() => import("react-image-crop"));

interface CropImageWrappeProps {
  open: boolean;
  onClose: () => void;
  imgSrc: string;
  onSaveCroppedImage: (file: any) => void;
}

let imageRef: HTMLImageElement;
export const withCropImage = (WrappedComponent: FC<CropImageProps>) => {
  return ({
    open,
    onClose,
    imgSrc,
    onSaveCroppedImage
  }: CropImageWrappeProps) => {
    const [cropOptions, setCropOpions] = useState<ReactCrop.Crop>({
      unit: "%",
      width: 30,
      aspect: 1 / 1
    });
    const [croppedImage, setCroppedImage] = useState();

    const _onCropChange = (
      crop: ReactCrop.Crop,
      percentCrop: ReactCrop.PercentCrop
    ) => {
      setCropOpions(crop);
    };

    const _onImageLoaded = (target: HTMLImageElement) => {
      imageRef = target;
    };

    const _onCropComplete = (crop: ReactCrop.Crop) => {
      _makeClientCrop(crop);
    };

    const _makeClientCrop = async (crop: ReactCrop.Crop) => {
      if (imageRef && crop.width && crop.height) {
        const croppedImageUrl = await _getCroppedImg(imageRef, crop);
      }
    };

    const _getCroppedImg = (image: HTMLImageElement, crop: ReactCrop.Crop) => {
      const canvas: HTMLCanvasElement = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width as number;
      canvas.height = crop.height as number;
      const ctx = canvas.getContext("2d");
      const cropX = crop.x as number;
      const cropY = crop.y as number;
      const cropWidth = crop.width as number;
      const cropHeight = crop.height as number;

      ctx?.drawImage(
        image,
        cropX * scaleX,
        cropY * scaleY,
        cropWidth * scaleX,
        cropHeight * scaleY,
        0,
        0,
        cropWidth,
        cropHeight
      );

      const reader = new FileReader();
      canvas.toBlob(blob => {
        reader.readAsDataURL(blob as any);
        reader.onloadend = () => {
          _dataURLtoFile(reader.result as any, "cropped.jpg");
        };
      });
    };

    const _dataURLtoFile = (dataurl: string, filename: string) => {
      let arr = dataurl.split(","),
        mime = (arr[0] as any).match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      let croppedImage = new File([u8arr], filename, { type: mime });
      onSaveCroppedImage(croppedImage);
    };

    return (
      <WrappedComponent
        open={open}
        onClose={onClose}
        imgSrc={imgSrc}
        cropOptions={cropOptions}
        onCropChange={_onCropChange}
        onImageLoaded={_onImageLoaded}
        onCropComplete={_onCropComplete}
        onSave={_onSave}
      />
    );
  };
};
