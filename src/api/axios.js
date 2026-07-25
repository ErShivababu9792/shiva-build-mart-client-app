import axios from "axios";

const api = axios.create({

  baseURL: "https://shiva-build-mart-api.onrender.com/api",

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
