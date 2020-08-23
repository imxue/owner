import axios from "axios";
import i18n from "../locale/index";
import router from "../router";
import { MessageBox } from "element-ui";
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
    if (error.response.status === 403) {
      MessageBox.alert(i18n.t("UserNotTime"), {
        confirmButtonText: i18n.t("Confirm"),
        type: "error"
      }).then(() => {
        localStorage.removeItem("token");
        router.push("/Login");
      });
    }
    if (error.response.status === 401) {
      MessageBox.alert(i18n.t("Notauth"), {
        confirmButtonText: i18n.t("Confirm"),
        type: "error"
      }).then(() => {
        localStorage.removeItem("token");
        router.push("/Login");
      });
    }
    return Promise.reject(error);
  }
);

export default service;
