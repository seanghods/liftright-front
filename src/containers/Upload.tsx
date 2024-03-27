import { useUser } from "@/UserContext";
import { VideoUploader } from "@/components";
import React, { useEffect } from "react";

const Upload: React.FC = () => {
  const { user } = useUser();
  useEffect(() => {
    document.title = "LiftRight - Upload";
  }, []);
  return (
    <>
      {/* <div className="container"> */}
      <div>
        <h1
          data-aos="fade-down"
          className="text-2xl font-black tracking-tighter lg:text-3xl lg:leading-none text-center mt-12"
        >
          Credits: ###
        </h1>
        <h3 data-aos="fade-up" className="text-center mt-6 text-sm text-error">
          {user
            ? user.credits == 0
              ? "Please purchase credits to use LiftRight."
              : null
            : "Please create an account to use LiftRight."}
        </h3>
      </div>
      <VideoUploader />
      {/* </div> */}
    </>
  );
};

export default Upload;
