import axios from "axios";
import { Message } from "element-ui";
import router from "../router";
axios.defaults.withCredentials = true;
const service = axios.create({
  baseURL: "/",
  time: 5000
});

service.interceptors.request.use(config => {
  if (localStorage.getItem("token")) {
    config.headers["Authorization"] = localStorage.getItem("token");
  }
  return config;
});
service.interceptors.response.use(
  response => {
    if (response.data.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    Message({
      showClose: true,
      type: "error",
      duration: 2 * 1000,
      message: error.response.data
    });
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      router.push("/Login");
    }
    return Promise.reject(error);
  }
);

export default service;
