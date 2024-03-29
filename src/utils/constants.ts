export const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://api.liftrightai.com/api"
    : "/api";

export const API_ROUTES = {
  base: `${BASE_URL}`,
  response: `${BASE_URL}/response`,
  feedback: `${BASE_URL}/feedback`,
  contactUs: `${BASE_URL}/contact-us`,
  register: `${BASE_URL}/register`,
  logIn: `${BASE_URL}/log-in`,
  logOut: `${BASE_URL}/log-out`,
  checkSession: `${BASE_URL}/check-session`,
  verifyEmail: `${BASE_URL}/verify-email`,
  createCheckoutSession: `${BASE_URL}/create-checkout-session`,
  forgotPassword: `${BASE_URL}/forgot-password`,
  resetPassword: `${BASE_URL}/reset-password`,
};
