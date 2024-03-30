import { useUser } from "@/UserContext";
import { GoogleIcon } from "@/components/sub-components/Icons";
import { API_ROUTES } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { user, setUser } = useUser();
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    message: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "LiftRight - Login";
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError({
      message: "",
    });

    if (!formData.email.includes("@")) {
      setFormError({ message: "Please enter a valid email address." });
      return;
    }

    try {
      setAwaitingResponse(true);
      const response = await fetch(API_ROUTES.logIn, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      if (!response.ok) {
        setAwaitingResponse(false);
        const error = await response.json();
        if (error.message) {
          setFormError({
            message: error.message,
          });
          return;
        } else {
          throw new Error("Failed to register");
        }
      }
      setAwaitingResponse(false);
      const data = await response.json();
      setUser(data.user);
      navigate("/upload");
    } catch (error) {
      console.error("Login failed:", error);
      setFormError({
        message: "Login failed. Please try again.",
      });
    }
  };
  function handleGoogle() {
    const url =
      import.meta.env.MODE === "production"
        ? "https://api.liftrightai.com/auth/google"
        : "http://localhost:3001/auth/google";
    window.location.href = url;
  }
  return (
    <>
      <div className="relative flex-1 flex flex-col">
        <div className="flex-1 md:min-h-[800px] bg-no-repeat bg-cover bg-center bg-gym-bg-login py-24 md:py-36 flex flex-row mx-0 justify-center">
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
              {user ? (
                <div className="text-black">You are currently signed in.</div>
              ) : (
                <>
                  <div className="w-full flex justify-center">
                    <button
                      onClick={() => handleGoogle()}
                      className="flex btn btn-sm btn-success"
                    >
                      <GoogleIcon />
                      Sign in with Google
                    </button>
                  </div>
                  <div className="my-5 flex w-full items-center justify-between space-x-3.5">
                    <div className="h-[1px] grow bg-gray-200"></div>
                    <div className="shrink-0 font-medium uppercase text-gray-400">
                      Or
                    </div>
                    <div className="h-[1px] grow bg-gray-200"></div>
                  </div>
                  <form
                    method="post"
                    onSubmit={handleLogIn}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 tracking-wide">
                        Email
                      </label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
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
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="p-3 bg-black w-full text-sm rounded-lg focus:outline-none"
                        type="password"
                        placeholder="Enter your password"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <Link
                          to="/forgot-password"
                          className="text-primary hover:text-blue-400"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </div>
                    <div className="h-[15px] mt-2 text-sm">
                      <div className="text-error font-bold">
                        {formError.message}
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className={`btn btn-primary w-full flex justify-center rounded-full tracking-wide shadow-lg ${
                          awaitingResponse &&
                          "btn-disabled !bg-gray-800 !text-gray-400"
                        }`}
                      >
                        {awaitingResponse ? "Signing in..." : "Sign in"}
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

export default Login;
