import axios from "axios";

export const baseURL =
  process.env.NODE_ENV === "development"
    ? `http://nathan-laravel-api.test`
    : `https://nathanjms-api.herokuapp.com`;

export function AuthenticatedRequest(userToken) {
  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${userToken}`,
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

export const login = async (email, password) => {
  return await axios.post(`${baseURL}/api/login`, {
    email: email,
    password: password,
  });
};
