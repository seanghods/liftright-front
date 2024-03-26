import React from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  return (
    <>
      <div className="relative">
        <div className="bg-no-repeat bg-cover bg-center bg-gym-bg2 py-36 sm:flex sm:flex-row mx-0 justify-center">
          <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl">
            <div
              data-aos="fade-right"
              className="self-start hidden lg:flex flex-col  text-white"
            >
              <img src="" className="mb-3" />
              <h1 className="mb-3 font-bold text-5xl">Welcome.</h1>
              <p className="pr-3">
                Try LiftRight AI to see improvements you can make in your
                workout and weightlifting form.
              </p>
            </div>
          </div>
          <div className="flex justify-center self-center w-[375px]">
            <div
              data-aos="fade-left"
              className="p-12 bg-primary-content mx-auto rounded-2xl w-100 "
            >
              <div className="mb-4">
                <h3 className="font-semibold text-2xl text-gray-800">
                  Register{" "}
                </h3>
                <p className="text-gray-500">
                  Please register for a new account.
                </p>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Email
                  </label>

                  <input
                    className="input w-full text-base rounded-lg focus:outline-none"
                    type="text"
                    placeholder="mail@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    className="input w-full text-base rounded-lg focus:outline-none"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a href="#" className="text-primary">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  By registering I agree to the{" "}
                  <Link
                    to="/terms-of-service"
                    className="text-blue-400 w-4/5 md:w-1/2"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-blue-400 w-4/5 md:w-1/2 text-right"
                  >
                    Privacy Policy
                  </Link>
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-primary w-full flex justify-center rounded-full tracking-wide shadow-lg"
                  >
                    Sign in
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <Link
                  to="/log-in"
                  className="text-blue-500 hover:text-blue-400 text-sm"
                >
                  Already have an account? Log in
                </Link>
              </div>
              <div className="pt-5 text-center text-gray-400 text-xs">
                Your privacy and security are important to us. We use
                industry-standard security measures to protect your personal
                information, including secure handling of passwords.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
