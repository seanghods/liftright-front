import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  useEffect(() => {
    document.title = "LiftRight - Login";
  }, []);
  return (
    <>
      <div className="relative flex-1 flex flex-col">
        <div className="flex-1 md:min-h-[800px] bg-no-repeat bg-cover bg-center bg-gym-bg py-24 md:py-36 flex flex-row mx-0 justify-center">
          <div className="hidden sm:flex flex-col self-center p-10 sm:max-w-5xl xl:max-w-2xl">
            <div
              data-aos="fade-right"
              className="self-start hidden lg:flex flex-col  text-white"
            >
              <h1 className="mb-3 font-bold text-5xl">Welcome back.</h1>
              <p className="pr-3">
                Let's look at your form and see what you're doing well at and
                need to improve.
              </p>
            </div>
          </div>
          <div className="flex justify-center self-center">
            <div
              data-aos="fade-left"
              className="p-8 bg-primary-content mx-auto rounded-2xl w-[350px]"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-xl text-gray-800">
                  Sign In{" "}
                </h3>
                <p className="text-gray-500">Please sign in to your account.</p>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    className="p-3 bg-black w-full text-sm rounded-lg focus:outline-none"
                    type="text"
                    placeholder="mail@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    className="p-3 bg-black w-full text-sm rounded-lg focus:outline-none"
                    type="password"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link to="/" className="text-primary hover:text-blue-400">
                      Forgot your password?
                    </Link>
                  </div>
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
                  to="/register"
                  className="text-blue-500 hover:text-blue-400 text-sm"
                >
                  Don't have an account yet? Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
