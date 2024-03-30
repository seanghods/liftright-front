import { useUser } from "@/UserContext";
import { GoogleIcon } from "@/components/sub-components/Icons";
import PaymentForm from "@/components/sub-components/PaymentForm";
import { API_ROUTES } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const { user, setUser } = useUser();
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);
  useEffect(() => {
    setShowPaymentForm(!!user);
  }, [user]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    tos: false,
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
    tos: "",
  });
  useEffect(() => {
    document.title = "LiftRight - Register";
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError({
      email: "",
      password: "",
      tos: "",
    });
    if (!formData.email.includes("@")) {
      setFormError((prevState) => ({
        ...prevState,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    if (formData.password.length < 6) {
      setFormError((prevState) => ({
        ...prevState,
        password: "Password must be greater than 6 characters.",
      }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError((prevState) => ({
        ...prevState,
        password: "Passwords do not match.",
      }));
      return;
    }

    if (!formData.tos) {
      setFormError((prevState) => ({
        ...prevState,
        tos: "Please check your agreement above.",
      }));
      return;
    }

    try {
      setAwaitingResponse(true);
      const response = await fetch(API_ROUTES.register, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          credits: 0,
        }),
      });

      if (!response.ok) {
        setAwaitingResponse(false);
        const error = await response.json();
        if (error.message) {
          setFormError((prevState) => ({
            ...prevState,
            email: error.message,
          }));
          return;
        } else {
          throw new Error("Failed to register");
        }
      }
      const data = await response.json();
      setAwaitingResponse(false);
      setUser(data.user);
    } catch (error) {
      setAwaitingResponse(false);
      console.error("Registration failed:", error);
      setFormError((prevState) => ({
        ...prevState,
        email: "Registration failed. Please try again.",
      }));
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
        <div
          className={`flex-1 bg-no-repeat bg-cover bg-center bg-gym-bg-register py-24 ${
            showPaymentForm ? "md:py-48" : "md:py-24"
          } flex flex-row mx-0 justify-center`}
        >
          <div className="hidden sm:flex flex-col self-center p-10 sm:max-w-5xl xl:max-w-2xl">
            <div
              data-aos="fade-right"
              className="self-start hidden lg:flex flex-col  text-white"
            >
              <h1 className="mb-3 font-bold text-5xl">Welcome.</h1>
              <p className="pr-3">
                Try LiftRight AI to see improvements you can make in your
                workout and weightlifting form.
              </p>
            </div>
          </div>
          <div className="flex justify-center self-center">
            <div
              data-aos="fade-left"
              className="w-[325px] p-8 bg-primary-content mx-auto rounded-2xl w-100"
            >
              <div className="mb-4">
                <h3 className="font-semibold text-xl text-gray-800">
                  Register{" "}
                </h3>
                {showPaymentForm && (
                  <p className="my-3 w-[200px] text-gray-500 text-sm">
                    Please check your email for a verification link.
                  </p>
                )}
                <p className="text-gray-500 text-sm">
                  {showPaymentForm
                    ? "Purchase Credits to use LiftRight."
                    : "Please register for a new account."}
                </p>
              </div>
              {showPaymentForm ? (
                <PaymentForm />
              ) : (
                <>
                  <div className="w-full flex justify-center">
                    <button
                      onClick={() => handleGoogle()}
                      className="flex btn btn-sm btn-primary"
                    >
                      <GoogleIcon />
                      Sign up with Google
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
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
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
                    <div className="space-y-1">
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
                    <div className="space-y-1">
                      <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                        Confirm Password
                      </label>
                      <input
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="p-3 bg-black w-full text-sm rounded-lg focus:outline-none"
                        type="password"
                        placeholder="Confirm password"
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
                    <div className="flex gap-3 text-sm text-gray-700">
                      <div className="mt-2">
                        <input
                          name="tos"
                          type="checkbox"
                          onChange={handleInputChange}
                          checked={formData.tos}
                          className="checkbox-primary h-[18px] w-[18px]"
                        />
                      </div>
                      <div className="mt-2">
                        By registering I agree to the{" "}
                        <Link
                          to="/terms-of-service"
                          className="text-primary hover:text-blue-400 w-4/5 md:w-1/2"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy-policy"
                          className="text-primary hover:text-blue-400 w-4/5 md:w-1/2 text-right"
                        >
                          Privacy Policy
                        </Link>
                      </div>
                    </div>
                    <div className="h-[15px] mt-2 text-sm">
                      <div className="text-error font-bold">
                        {formError.email}
                      </div>
                      <div className="text-error font-bold">
                        {formError.password}
                      </div>
                      <div className="text-error font-bold">
                        {formError.tos}
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
                        {awaitingResponse ? "Registering..." : "Register"}
                      </button>
                    </div>
                  </form>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
