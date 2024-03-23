import React, { useEffect } from "react";

import Uppy, { UploadResult } from "@uppy/core";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { Dashboard } from "@uppy/react/";
import XHRUpload from "@uppy/xhr-upload";

export const VideoUploader: React.FC = () => {
  const uppy = new Uppy({
    meta: { type: "video" },
    restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ["video/*"] },
    autoProceed: false,
  });
  useEffect(() => {
    uppy.use(XHRUpload, {
      endpoint: "http://localhost:3001/upload", // Your server endpoint
    });
    uppy.on("complete", (result: UploadResult) => {
      console.log("Upload complete!", result.successful);
      // Here you could handle the result, e.g., displaying a success message, redirecting the user, etc.
    });
    return () => uppy.close(); // Clean up the uppy instance when the component unmounts
  }, [uppy]);
  return (
    <div className="w-full flex justify-center my-12">
      <Dashboard theme="dark" uppy={uppy} />
    </div>
  );
};
