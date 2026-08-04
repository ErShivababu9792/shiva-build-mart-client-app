import axios from "axios";

const rawApiUrl = import.meta.env.VITE_API_URL?.trim() || "";
const trimmedApiUrl = rawApiUrl.replace(/\/+$/, "");
const apiHost = trimmedApiUrl.endsWith("/api")
  ? trimmedApiUrl.slice(0, -4)
  : trimmedApiUrl;

const api = axios.create({

  baseURL: `${apiHost}/api`,

  headers: {
    "Content-Type": "application/json",
  },

});


// REQUEST INTERCEPTOR
api.interceptors.request.use(
(config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

},
(error) => {
  return Promise.reject(error);
});


export default api;