import axios from "axios";

export function AuthenticatedRequest(currentUser) {
  const baseURL =
    process.env.NODE_ENV === "development"
      ? `http://nathan-laravel-api.test`
      : `https://nathanjms-laravel-api.herokuapp.com`;

  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${currentUser}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export const FormatResponseError = (err) => {
  if (err?.response?.status === 401) {
    localStorage.clear();
    return "Authentication Failed. Please login again.";
  }
  if (err?.response?.data?.message) {
    return err.response.data.message;
  }
  return "Error: The API could not be reached.";
};
