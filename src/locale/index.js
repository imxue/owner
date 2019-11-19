import Vue from "vue";
import VueI18n from "vue-i18n";

import en from "element-ui/src/locale/lang/en";
import zh from "element-ui/src/locale/lang/zh-CN";
import zhTw from "element-ui/src/locale/lang/zh-TW";

import customizeZh from "./zh-CN.json";
import customizeZW from "./FT.json";
import customizeUS from "./En.json";

Vue.use(VueI18n);

const navLang = navigator.language;

const lang = localStorage.getItem("lang") || navLang || "en-US";
Vue.locale = () => {};
const messages = {
  "en-US": { ...en, ...customizeUS },
  "zh-CN": { ...zh, ...customizeZh },
  zhTw: { ...zhTw, ...customizeZW }
};

const i18n = new VueI18n({
  locale: lang, // set locale
  messages, // set locale messages
  silentFallbackWarn: true
});
export default i18n;
