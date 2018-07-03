import axios from "axios";
window.baseURL = "http://localhost:3000/";
const axiosI = axios.create({
  baseURL: window.baseURL
});

axiosI.interceptors.request.use(
  function(request) {
    request.headers["Authorization"] = `Bearer ${(localStorage.getItem("api_token")||"")}`;
    return request;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axiosI.interceptors.response.use(
  function(response) {
    if (typeof window === "undefined") {
      return response;
    }
    return response;
  },
  function(error) {
    if (error.response.status == 401) {
      localStorage.removeItem("api_token");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosI;
