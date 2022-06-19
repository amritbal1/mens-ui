import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { ContainerIcon } from "./ContainerIcon";
import { baseStyle } from "./styles";
import { CameraIcon } from "@heroicons/react/solid";
import { getCroppedImg } from "./CanvasUtils";
import { isEmpty } from "../../utils/objectUtils";

const SinglePreviewUpload = ({
  additionalBaseStyle,
  currentImage,
  currentImageUrl = null,
  disabled = false,
  handleFiles = () => {},
}) => {
  const [files, setFiles] = useState([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [displayCropper, setDisplayCropper] = useState(false);

  const getCurrentImageString = ({ currentImage }) => {
    var arrayBufferView = new Uint8Array(currentImage);
    var blob = new Blob([arrayBufferView], { type: "image/jpeg" });
    var urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blob);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: async (acceptedFiles) => {
      setDisplayCropper(true);
      let fileList = [];
      acceptedFiles.forEach((acceptedFile) => {
        const reader = new FileReader();
        reader.onload = () => {
          fileList.push({
            ...acceptedFile,
            arrayBufferFile: reader.result,
          });
        };
        reader.onloadend = () => {
          setFiles(fileList);
        };
        reader.readAsArrayBuffer(acceptedFile);
      });
      const imageDataUrl = await readFile(acceptedFiles[0]);
      await setImageSrc(imageDataUrl);
      setDisplayCropper(true);
    },
  });

  const handleCancelButton = () => {
    setFiles([]);
    handleFiles({ files: [] });
    setDisplayCropper(false);
  };

  const handleSaveButton = useCallback(async () => {
    try {
      const { croppedImageArrayBuffer } = await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      );
      const updatedArr = [
        {
          ...files[0],
          arrayBufferFile: croppedImageArrayBuffer,
        },
      ];
      setFiles(updatedArr);
      const allBufferFiles = [croppedImageArrayBuffer];
      handleFiles({ files: allBufferFiles });
      setImageSrc(null);
      setDisplayCropper(false);
    } catch (e) {
      console.error("Error saving cropped image: ", e);
    }
    // eslint-disable-next-line
  }, [imageSrc, croppedAreaPixels]);

  const containerStyle = { ...baseStyle, ...additionalBaseStyle };

  const readFile = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const iconStyleDisabled = disabled ? "" : "cursor-pointer";
  const iconStyle = `${iconStyleDisabled} h-5 w-5 stroke-current text-white`;
  const imageStyle = `${iconStyleDisabled} rounded-full`;

  const getImage = ({ currentImageUrl, currentImage }) => {
    if (isEmpty(currentImage) && !isEmpty(currentImageUrl)) {
      return (
        <div class="w-full">
          <div
            {...getRootProps({
              className: "dropzone",
            })}
          >
            <input {...getInputProps()} />
            {files.length > 0 || isEmpty(currentImage) ? (
              <div class="relative" style={{ height: "11rem", width: "11rem" }}>
                <img
                  src={currentImageUrl}
                  style={{ height: "11rem", width: "11rem" }}
                  class={imageStyle}
                  alt="preview"
                />
                <span class="absolute bottom-1 right-1 rounded-full bg-lilac-500 p-1">
                  <CameraIcon class={iconStyle} />
                </span>
              </div>
            ) : (
              <div>
                <ContainerIcon />
              </div>
            )}
          </div>
        </div>
      );
    }
    if (!isEmpty(currentImage)) {
      return (
        <div class="w-full">
          <div
            {...getRootProps({
              className: "dropzone",
            })}
          >
            <input {...getInputProps()} />
            {files.length > 0 || !isEmpty(currentImage) ? (
              <div class="relative" style={{ height: "11rem", width: "11rem" }}>
                <img
                  src={getCurrentImageString({
                    currentImage: currentImage[0],
                  })}
                  style={{ height: "11rem", width: "11rem" }}
                  class={imageStyle}
                  alt="preview"
                />
                <span class="absolute bottom-1 right-1 rounded-full bg-lilac-500 p-1">
                  <CameraIcon class={iconStyle} />
                </span>
              </div>
            ) : (
              <div>
                <ContainerIcon />
              </div>
            )}
          </div>
        </div>
      );
    }
    if (isEmpty(currentImage) && isEmpty(currentImageUrl)) {
      return (
        <div class="w-full">
          <div
            {...getRootProps({
              className: "dropzone",
            })}
          >
            <input {...getInputProps()} />(
            <div>
              <ContainerIcon />
            </div>
            )
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <div class="flex flex-col" style={containerStyle}>
        {!displayCropper ? getImage({ currentImageUrl, currentImage }) : null}
        {displayCropper ? (
          <div class="w-full">
            <div
              class="flex flex-col relative"
              style={{ width: "11rem", height: "11rem" }}
            >
              <div
                class="rounded-full relative"
                style={{ width: "11rem", height: "11rem" }}
              >
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  cropShape={"round"}
                  aspect={4 / 4}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  style={{
                    containerStyle: {
                      width: "11rem",
                      height: "11rem",
                      borderRadius: "9999px",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div>
        {displayCropper ? (
          <div class="flex pt-2 w-44 justify-between">
            <button
              class="text-white text-xs rounded-md px-3 py-1 bg-lilac-400 hover:opacity-70 mt-2"
              onClick={handleCancelButton}
            >
              Cancel
            </button>
            <button
              class="text-white text-xs rounded-md px-3 py-1 bg-lilac-400 hover:opacity-70 mt-2"
              onClick={handleSaveButton}
            >
              Save
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SinglePreviewUpload;
