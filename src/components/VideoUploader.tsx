import React, { useEffect, useMemo, useState } from "react";
import Uppy, { UploadResult } from "@uppy/core";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Dashboard } from "@uppy/react/";
import XHRUpload from "@uppy/xhr-upload";
import { LoadingIcon } from "./Icons";

export const VideoUploader: React.FC = () => {
  const [uploadReady, setUploadReady] = useState<Boolean>(false);
  const [awaitingResponse, setAwaitingResponse] = useState<Boolean>(false);
  const uppy = useMemo(() => {
    const uppyInstance = new Uppy({
      meta: { type: "video" },
      restrictions: {
        maxFileSize: 20000000,
        maxNumberOfFiles: 1,
        allowedFileTypes: ["video/*"],
      },
      autoProceed: false,
    });

    uppyInstance.use(XHRUpload, {
      endpoint: "http://localhost:3001/upload",
      fieldName: "video",
    });

    return uppyInstance;
  }, []);
  useEffect(() => {
    uppy.on("file-added", (file) => {
      if (file.type.includes("video")) {
        const thumbnailCount = 1;
        const VideoThumbnails = (window as any).VideoThumbnails;
        const thumbnails = new VideoThumbnails({
          count: thumbnailCount,
          maxWidth: 400,
          maxHeight: 400,
        });
        thumbnails.on("capture", function (image) {
          uppy.setFileState(file.id, { preview: image });
        });
        try {
          thumbnails.capture(file.data);
        } catch (error) {
          console.error("Error capturing thumbnail:", error);
        }
      }

      setUploadReady(true);
    });

    uppy.on("file-removed", (file, reason) => {
      if (uppy.getFiles().length === 0) {
        setUploadReady(false);
      }
    });
    uppy.on("complete", (result: UploadResult) => {
      if (result.successful.length > 0) {
        const response = result.successful[0].response;
        console.log(response.body.data);
      } else {
        const response = result.failed[0].response;
        console.log(`Error: ${response.body.err}`);
      }
    });
    return () => uppy.close();
  }, [uppy]);
  return (
    <>
      <div data-aos="fade-up" className="w-full flex justify-center my-12">
        <Dashboard
          hideUploadButton={true}
          width="250"
          theme="dark"
          uppy={uppy}
          note="Upload one video."
        />
      </div>
      <div data-aos="fade-up" className="w-full flex justify-center">
        <button
          className={`btn mb-12 w-28 ${
            uploadReady ? "btn-primary" : "btn-disabled !bg-gray-900"
          } ${awaitingResponse ? "btn-disabled brightness-150" : null}`}
          onClick={() => {
            if (uploadReady) {
              uppy.upload();
              setAwaitingResponse(true);
              document.getElementById("submit_modal").showModal();
            }
          }}
        >
          {awaitingResponse ? "Submitting..." : "Submit"}
        </button>
        <dialog id="submit_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Processing</h3>
            <div className="flex w-full justify-center my-5">
              <LoadingIcon />
            </div>
            <p className="py-4">
              Your video is currently processing and being analyzed by
              LiftRight. Please allow up to 30 seconds for a complete response.
            </p>
          </div>
        </dialog>
      </div>
    </>
  );
};
