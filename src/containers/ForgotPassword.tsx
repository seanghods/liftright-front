import { useUser } from "@/UserContext";
import { API_ROUTES } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const { user } = useUser();
  const [email, setEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  useEffect(() => {
    document.title = "LiftRight - Forgot Password";
  }, []);
  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch(API_ROUTES.forgotPassword, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    if (data.success) {
      setResetMsg(
        "Submitted. If you have an account with your submitted email, expect a reset password link shortly."
      );
    } else {
      setResetMsg(
        "There was an error requesting your forgotten password. The developer has been notified. Please try again later."
      );
    }
  }
  return (
    <>
      <div className="relative flex-1 flex flex-col">
        <div className="flex-1 md:min-h-[800px] bg-no-repeat bg-cover bg-center bg-gym-bg-forgot py-24 md:py-36 flex flex-row mx-0 justify-center">
          <div className="hidden sm:flex flex-col self-center p-10 sm:max-w-5xl xl:max-w-2xl">
            <div
              data-aos="fade-right"
              className="self-start hidden lg:flex flex-col  text-white"
            >
              <h1 className="mb-3 font-bold text-5xl">Forgot Password.</h1>
            </div>
          </div>
          <div className="flex justify-center self-center">
            <div
              data-aos="fade-left"
              className="p-8 bg-primary-content mx-auto rounded-2xl w-[350px]"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-xl text-gray-800">
                  Forgot Password{" "}
                </h3>
                <p className="text-gray-500">Please enter your email.</p>
              </div>
              {user ? (
                <div className="text-black">You are currently signed in.</div>
              ) : (
                <>
                  <form
                    method="post"
                    onSubmit={handleReset}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 tracking-wide">
                        Email
                      </label>
                      <input
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 bg-black w-full text-sm rounded-lg focus:outline-none"
                        type="email"
                        placeholder="mail@gmail.com"
                      />
                    </div>
                    <div className="h-[15px] mt-2 text-sm">
                      <div className="text-error font-bold">{resetMsg}</div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary w-full flex justify-center rounded-full tracking-wide shadow-lg"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <div className="mt-3">
                    <Link
                      to="/register"
                      className="text-blue-500 hover:text-blue-400 text-sm"
                    >
                      Don't have an account yet? Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
