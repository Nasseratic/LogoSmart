import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import iView from "iview";
import "iview/dist/styles/iview.css";

Vue.use(iView);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
