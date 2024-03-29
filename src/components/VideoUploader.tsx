import React, { useEffect, useMemo, useState } from "react";
import Uppy, { UploadResult } from "@uppy/core";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Dashboard } from "@uppy/react/";
import XHRUpload from "@uppy/xhr-upload";
import LoadingAnalysis from "./sub-components/LoadingAnalysis";
import { useUser } from "@/UserContext";

export type ApiResponse = {
  message: string | null;
  s3Link: string | null;
  id: string | null;
};

export type Response = {
  responseNav: ResponseNav;
  responseObj: ResponseObj;
};

export type ResponseNav = {
  message: string | null;
  s3Link: string | null;
  id: string | null;
};

export type ResponseObj = {
  fullResponse: object;
  key: string;
  message: string;
  feedback?: string;
  userId: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export const VideoUploader: React.FC = () => {
  const { user, setUser } = useUser();
  const [uploadReady, setUploadReady] = useState<boolean>(false);
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse>({
    message: null,
    s3Link: null,
    id: null,
  });
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
      withCredentials: true,
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

    uppy.on("file-removed", (_file, _reason) => {
      if (uppy.getFiles().length === 0) {
        setUploadReady(false);
      }
    });
    uppy.on("complete", (result: UploadResult) => {
      if (result.successful.length > 0) {
        const response = result.successful[0].response?.body as Response;
        setApiResponse(response.responseNav);
        setUser((prevUser) =>
          prevUser
            ? {
                ...prevUser,
                responses: [
                  ...(prevUser.responses || []),
                  response.responseObj,
                ],
              }
            : null
        );
      } else {
        const response = result.failed[0].response;
        console.log(`Error: ${response?.body.err}`);
        setUser((prevUser) =>
          prevUser
            ? {
                ...prevUser,
                credits: prevUser.credits + 1,
              }
            : null
        );
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
          <div data-aos="fade-up" className="w-full flex justify-center my-8">
            <Dashboard
              className="w-[300px] md:w-[600px]"
              hideUploadButton={true}
              height="450px"
              theme="dark"
              uppy={uppy}
              note="Upload one video."
            />
          </div>
          <div data-aos="fade-up" className="w-full flex justify-center">
            <button
              className={`btn mb-12 w-28 ${
                uploadReady ? "btn-primary" : "btn-disabled !bg-gray-900"
              } ${awaitingResponse ? "btn-disabled brightness-150" : null} ${
                (!user || user.credits == 0 || !user.credits) && "btn-disabled"
              }`}
              onClick={() => {
                if (uploadReady) {
                  uppy.upload();
                  setUser((prevUser) =>
                    prevUser
                      ? {
                          ...prevUser,
                          credits: prevUser.credits ? prevUser.credits - 1 : 0,
                        }
                      : null
                  );
                  setAwaitingResponse(true);
                }
              }}
            >
              {awaitingResponse ? "Submitting..." : "Submit"}
            </button>
          </div>
        </>
      )}
    </>
  );
};
