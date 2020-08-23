import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import i18n from "./locale";
import "./util/init";
Vue.use(ElementUI);

Vue.config.productionTip = false;
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
