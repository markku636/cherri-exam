import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";

import "@/assets/style/utilities.scss";
import router from "@/router";
import i18n from "@/plugins/i18n";
import store from "@/store";

Vue.config.productionTip = false;

export const app = new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
