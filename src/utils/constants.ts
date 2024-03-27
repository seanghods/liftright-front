export const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://api.liftrightai.com/api"
    : "/api";

export const API_ROUTES = {
  base: `${BASE_URL}`,
  response: `${BASE_URL}/response`,
  feedback: `${BASE_URL}/feedback`,
  contactUs: `${BASE_URL}/contact-us`,
  users: `${BASE_URL}/users`,
  checkSession: `${BASE_URL}/check-session`,
};
