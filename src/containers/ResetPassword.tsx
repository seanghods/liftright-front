import { useEffect, useState } from "react";
import { API_ROUTES } from "../utils/constants";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    document.title = "LiftRight - Reset Password";
  }, []);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    token && setToken(token);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(API_ROUTES.resetPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      console.error("Error:", err);
      setMessage("Error, please try again.");
    }
  }

  return (
    <div className="container flex flex-col items-center gap-12 mb-12">
      <h1
        data-aos="fade-down"
        className="text-gradient text-2xl font-black tracking-tighter lg:text-3xl lg:leading-none text-center mt-12"
      >
        Reset Password
      </h1>
      <div className="w-full text-center font-bold flex flex-col items-center justify-center my-12 md:my-0">
        {token ? (
          <form
            className="flex flex-col px-4 pb-3 md:px-12 md:pb-3 gap-6 md:w-1/2"
            noValidate
            id="sign-up"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label htmlFor="password">Password</label>
            <input
              className="bg-gray-800 text-white font-gamebold border-2 border-gray-700 rounded-sm "
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="***"
              required
              minLength={6}
            />
            <label htmlFor="email">Confirm Password</label>
            <input
              className="bg-gray-800 text-white font-gamebold border-2 border-gray-700 rounded-sm"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="***"
            />
            <div className="button text-center mt-5">
              {" "}
              <button className="btn btn-primary rounded-lg text-center px-3 py-2">
                Reset Password
              </button>
              <div className="pw-msg font-game text-xs mt-2 ">
                Your privacy and security are important to us. We use
                industry-standard security measures to protect your personal
                information, including secure handling of passwords.
              </div>
              <div className="my-5">{message}</div>
            </div>
          </form>
        ) : (
          "Please use a valid link / token to reset your password."
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
