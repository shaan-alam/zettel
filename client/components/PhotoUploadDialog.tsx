import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import useDragAndDrop from "@/hooks/useDragAndDrop";
import { Progress } from "./ui/progress";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/index";
import { v4 } from "uuid";
import { Input } from "./ui/input";

interface PhotoUploadDialogProps {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PhotoUploadDialog: React.FC<PhotoUploadDialogProps> = ({
  open,
  setIsOpen,
}) => {
  const [file, setFile] = useState<File>();
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileUploadError, setFileUploadError] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [buttonText, setButtonText] = useState("Copy Link");

  useEffect(() => {
    setTimeout(() => {
      setButtonText("Copy Link");
    }, 3000);
  }, [buttonText]);

  const {
    dragOver,
    fileDropError,
    onDragLeave,
    onDragOver,
    setDragOver,
    setFileDropError,
  } = useDragAndDrop();

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    setDragOver(false);

    const selectedFile = e?.dataTransfer?.files[0];

    if (selectedFile.type.split("/")[0] !== "image") {
      return setFileDropError("Please provide an image file to upload!");
    }

    setFile(selectedFile);
  };

  const uploadFile = (e: any) => {
    setFile(e.target.files[0]);
    let selectedFile = e?.target?.files[0];

    console.log("files", e.target.files);

    if (selectedFile.type.split("/")[0] !== "image") {
      return setFileDropError("Please provide an image file to upload!");
    }

    setFileDropError("");
    const storageRef = ref(storage, `images/${v4()}.jpg`);

    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileUploadProgress(progress);
      },
      (error) => {
        setFileUploadError(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileURL(downloadURL);
        });
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={() => setIsOpen(false)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload a Photo</DialogTitle>
          <DialogDescription>
            Select or drag & drop a picture to upload!
          </DialogDescription>
        </DialogHeader>
        <div className="w-full">
          {!file && (
            <>
              {fileDropError && (
                <span className="text-red-500 text-sm mb-2 block">
                  {fileDropError}
                </span>
              )}
              <label
                htmlFor="input"
                className="h-[100px] flex items-center justify-center w-full border-dashed border-gray-400 border-2 cursor-pointer hover:border-gray-600"
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                style={{ border: `${dragOver ? "3px dashed black" : ""}` }}
              >
                <h1 style={{ color: `${dragOver ? " black" : ""}` }}>
                  {!dragOver
                    ? "Select Or Drop your File here..."
                    : "Drop here..."}
                </h1>
              </label>
              <input
                type="file"
                id="input"
                accept="image/*"
                className="hidden"
                onChange={uploadFile}
              />
            </>
          )}
          {file && (
            <>
              <p className="block mb-2 text-center text-black">Uploading...</p>
              <Progress value={fileUploadProgress} />
            </>
          )}
          {fileURL && (
            <Input
              value={`![alt text](${fileURL})`}
              onClick={() => navigator.clipboard.writeText(fileURL)}
              className="mt-2 block"
            />
          )}
        </div>
        <DialogFooter>
          {fileURL && (
            <Button
              type="submit"
              onClick={() => {
                setButtonText("Copied!");
                navigator.clipboard.writeText(`![alt text](${fileURL})`);
              }}
            >
              {buttonText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoUploadDialog;
