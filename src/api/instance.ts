import axios from "axios";
const BASE_URL = "https://fakestoreapi.com";
const TOKEN = (() => "Bearer " + localStorage.getItem("token"))();
export const api = axios.create({
  baseURL: BASE_URL,

  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer" + TOKEN,
  },
});

// FIXME: identify how to handle the error messages

api.interceptors.request.use(
  (response) => response,
  (error) => {
    if (error.response.status === 400) {
      error.message = "Error making the request try again later";
      // console.log;
    }
    return Promise.reject(error);
  }
);

export default api;
