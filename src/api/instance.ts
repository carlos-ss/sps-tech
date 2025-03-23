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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("this");
    if (error.response.status === 400) {
      error.message = "Error making the request try again later";
      // console.log;
    } else if (error.response.status === 401) {
      error.message = "Unauthorized, incorrect credentials";
    }
    return Promise.reject(error);
  }
);

export default api;
