import { useEffect, useState } from "react";
import { API_ROUTES } from "../utils/constants";
import { Link } from "react-router-dom";
import { useUser } from "@/UserContext.js";

const VerifyEmail: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState("");
  const { setUser } = useUser();
  useEffect(() => {
    document.title = "LiftRight - Verify Email";
  }, []);
  useEffect(() => {
    const verifyEmail = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");

      if (!token) {
        setVerificationStatus(
          "Invalid verification link. Please check your email or contact us for support."
        );
        return;
      }

      try {
        const response = await fetch(
          `${API_ROUTES.verifyEmail}?token=${token}`
        );
        const data = await response.json();
        setVerificationStatus(data.message);
        setUser(data.user);
      } catch (error) {
        setVerificationStatus("Failed to verify email. Please try again.");
      }
    };

    verifyEmail();
  }, []);
  return (
    <>
      <div className="container flex flex-col items-center gap-12 mb-12">
        <h1
          data-aos="fade-down"
          className="text-gradient text-2xl font-black tracking-tighter lg:text-3xl lg:leading-none text-center mt-12"
        >
          Verify Email
        </h1>
        <div className="w-full text-center font-bold text-xl flex flex-col gap-12 items-center justify-center my-12 md:my-0">
          {verificationStatus}
          <div>Thank you.</div>
          <div className="w-[200px]">
            <Link to="/upload">
              <button className="btn btn-primary">Upload a Video</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
