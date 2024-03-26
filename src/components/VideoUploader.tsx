import React, { useEffect, useMemo, useState } from "react";
import Uppy, { UploadResult } from "@uppy/core";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Dashboard } from "@uppy/react/";
import XHRUpload from "@uppy/xhr-upload";
import { LoadingIcon, Xmark } from "./sub-components/Icons";
import LoadingAnalysis from "./sub-components/LoadingAnalysis";

export type ApiResponse = {
  message: string | null;
  s3Link: string | null;
  id: string | null;
};

export const VideoUploader: React.FC = () => {
  const [uploadReady, setUploadReady] = useState<boolean>(false);
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse>({
    message: null,
    s3Link: null,
    id: null,
  });
  // useEffect(() => {
  //   setTimeout(
  //     () => setApiResponse({ message: "hi", s3: null, id: "5341ea" }),
  //     3000
  //   );
  // }, []);
  useEffect(() => console.log(apiResponse), [apiResponse]);
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
      endpoint:
        import.meta.env.MODE === "production"
          ? "https://api.liftrightai.com/api/response"
          : "http://localhost:3001/api/response",
      fieldName: "video",
    });

    return uppyInstance;
  }, []);
  useEffect(() => {
    uppy.on("file-added", (file) => {
      if (file.type?.includes("video")) {
        const thumbnailCount = 1;
        const VideoThumbnails = (window as any).VideoThumbnails;
        const thumbnails = new VideoThumbnails({
          count: thumbnailCount,
          maxWidth: 400,
          maxHeight: 400,
        });
        thumbnails.on("capture", function (image: any) {
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
        setApiResponse(response?.body);
        console.log(response?.body);
      } else {
        const response = result.failed[0].response;
        console.log(`Error: ${response?.body.err}`);
        setError(true);
      }
    });
    return () => uppy.close();
  }, [uppy]);
  return (
    <>
      {awaitingResponse ? (
        <LoadingAnalysis apiResponse={apiResponse} error={error} />
      ) : (
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
            <dialog
              onClose={() => setError(false)}
              id="submit_modal"
              className="modal"
            >
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                {error ? (
                  <>
                    <h3 className="font-bold text-lg">Error!</h3>
                    <div className="flex w-full justify-center mt-10">
                      <Xmark />
                    </div>
                    <p className="py-4">
                      Unfortunately, Liftright AI hit a snag in processing your
                      video. The error has been reported and your credit has
                      been refunded to you. Please try again soon.
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="font-bold text-lg">Processing</h3>
                    <div className="flex w-full justify-center my-5">
                      <LoadingIcon />
                    </div>
                    <p className="py-4">
                      Your video is currently processing and being analyzed by
                      LiftRight. Please allow up to 30 seconds for a complete
                      response.
                    </p>
                  </>
                )}
              </div>
            </dialog>
          </div>
        </>
      )}
    </>
  );
};
