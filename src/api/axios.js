import axios from "axios";


const api = axios.create({

  baseURL: "http://localhost:5000/api",

  headers: {
    "Content-Type": "application/json",
  },

});



// =======================
// REQUEST INTERCEPTOR
// =======================

api.interceptors.request.use(

(config) => {


  const token = localStorage.getItem("token");


  console.log(
    "API REQUEST:",
    config.method?.toUpperCase(),
    config.url
  );


  console.log(
    "AUTH TOKEN:",
    token ? "TOKEN AVAILABLE" : "TOKEN MISSING"
  );



  if (token) {

    config.headers.Authorization =
      `Bearer ${token}`;

  }


  return config;


},


(error) => {

  return Promise.reject(error);

}

);




// =======================
// RESPONSE INTERCEPTOR
// =======================

api.interceptors.response.use(


(response) => {

  return response;

},


(error) => {


  if (error.response) {


    console.log(
      "API ERROR:",
      error.response.status,
      error.response.data
    );


    // Token invalid only

    if (
      error.response.status === 401
    ) {

      localStorage.removeItem("token");

      // abhi redirect nahi karenge
      // taki payment flow break na ho

    }


  }
  

  return Promise.reject(error);


}

);



export default api;