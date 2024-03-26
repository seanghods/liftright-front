export const BASE_URL =
  import.meta.env.MODE === "production"
    ? "https://api.liftrightai.com/api"
    : "/api";

export const API_ROUTES = {
  base: `${BASE_URL}`,
  response: `${BASE_URL}/response`,
  feedback: `${BASE_URL}/feedback`,
};
