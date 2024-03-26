import { VideoUploader } from "@/components";
import React from "react";

const Upload: React.FC = () => {
  return (
    <>
      <div className="container">
        <h1
          data-aos="fade-down"
          className="text-2xl font-black tracking-tighter lg:text-4xl lg:leading-none text-center mt-12"
        >
          Credits: ###
        </h1>
        <VideoUploader />
      </div>
    </>
  );
};

export default Upload;
