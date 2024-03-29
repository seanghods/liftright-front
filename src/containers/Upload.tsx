import { useUser } from "@/UserContext";
import { VideoUploader } from "@/components";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

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
          Credits: {user?.credits || 0}
        </h1>
        <h3 data-aos="fade-up" className="text-center mt-6 text-sm text-error">
          {user ? (
            user?.credits == 0 || !user.credits ? (
              <>
                Please{" "}
                <Link to="/profile" className="text-red-300 hover:text-red-200">
                  purchase credits
                </Link>{" "}
                to use LiftRight.
              </>
            ) : null
          ) : (
            <>
              Please{" "}
              <Link to="/register" className="text-red-300 hover:text-red-200">
                create an account
              </Link>{" "}
              or{" "}
              <Link to="/log-in" className="text-red-300 hover:text-red-200">
                log in
              </Link>{" "}
              to use LiftRight.
            </>
          )}
        </h3>
      </div>
      <VideoUploader />
      {/* </div> */}
    </>
  );
};

export default Upload;
