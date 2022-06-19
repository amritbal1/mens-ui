import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { ContainerIcon } from "./ContainerIcon";
import { baseStyle, thumb, img, thumbInner, thumbsContainer } from "./styles";
import { XCircleIcon } from "@heroicons/react/solid";
import { getCroppedImg } from "./CanvasUtils";

const PreviewMediaUpload = ({
  additionalBaseStyle,
  handleFiles = () => {},
}) => {
  const [files, setFiles] = useState([]);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [displayCropper, setDisplayCropper] = useState(false);

  const handleFileRemoval = ({ index }) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    const newBufferFiles = newFiles.map((file) => {
      return file.arrayBufferFile;
    });
    handleFiles({ files: newBufferFiles });
    setFiles(newFiles);
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
          const droppedFile = {
            ...acceptedFile,
            arrayBufferFile: reader.result,
            preview: URL.createObjectURL(acceptedFile),
          };
          const allFiles = [...files, droppedFile];
          fileList.push(...allFiles);
        };
        reader.onloadend = () => {
          setFiles(fileList);
          const allBufferFiles = fileList.map((file) => {
            return file.arrayBufferFile;
          });
          handleFiles({ files: allBufferFiles });
        };
        reader.readAsArrayBuffer(acceptedFile);
      });
      const imageDataUrl = await readFile(acceptedFiles[0]);
      await setImageSrc(imageDataUrl);
      // await getCropperFile(acceptedFiles[0]);
      setDisplayCropper(true);
    },
  });

  const handleCancelButton = () => {
    const lastIndex = files.length - 1;
    const newArr = [...files];
    newArr.splice(lastIndex, 1);
    setFiles(newArr);
    const allBufferFiles = newArr.map((file) => {
      return file.arrayBufferFile;
    });
    handleFiles({ files: allBufferFiles });
    setDisplayCropper(false);
  };

  const handleSaveButton = useCallback(async () => {
    try {
      const { croppedImageBlob, croppedImageArrayBuffer } = await getCroppedImg(
        imageSrc,
        croppedAreaPixels
      );
      const lastFile = files[files.length - 1];
      const indexToReplace = files.length - 1;
      const lastFileUpdatedPreview = {
        ...lastFile,
        preview: croppedImageBlob,
        arrayBufferFile: croppedImageArrayBuffer,
      };
      const newArr = [...files];
      newArr.splice(indexToReplace, 1);
      const updatedArr = [...newArr, lastFileUpdatedPreview];
      setFiles(updatedArr);
      const allBufferFiles = updatedArr.map((file) => {
        return file.arrayBufferFile;
      });
      handleFiles({ files: allBufferFiles });
      setImageSrc(null);
      setDisplayCropper(false);
    } catch (e) {
      console.error("Error saving cropped image: ", e);
    }
    // eslint-disable-next-line
  }, [imageSrc, croppedAreaPixels]);

  const thumbs = files.map((file, index) => (
    <div style={thumb} key={file.name}>
      <XCircleIcon
        class="absolute -right-2 -top-3 h-6 w-6 cursor-pointer text-slate-gray"
        onClick={() => handleFileRemoval({ index })}
      />
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="preview" />
      </div>
    </div>
  ));

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

  return (
    <div class="flex flex-col" style={containerStyle}>
      {!displayCropper && (
        <div class="w-2/3">
          <div
            {...getRootProps({
              className: "dropzone",
            })}
          >
            <input {...getInputProps()} />
            <div>
              <ContainerIcon />
            </div>
          </div>
          <aside style={thumbsContainer}>{thumbs}</aside>
        </div>
      )}
      <div class="relative">
        {displayCropper ? (
          <div class="flex flex-col">
            <div class="h-64 w-64 relative">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={4 / 4}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div class="flex self-center">
              <button
                class="rounded-lg h-10 w-16 bg-lilac-600 hover:bg-lilac-300 mt-2 mr-6"
                onClick={handleCancelButton}
              >
                Cancel
              </button>
              <button
                class="rounded-lg h-10 w-14 bg-lilac-600 hover:bg-lilac-300  mt-2"
                onClick={handleSaveButton}
              >
                Save
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PreviewMediaUpload;
