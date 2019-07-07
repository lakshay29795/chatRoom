import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router/index"; 
import store from "./store";
import axios from 'axios'
import "./registerServiceWorker";
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate)
Vue.prototype.$http = axios
Vue.prototype.$resource = "@/static"

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  $_veeValidate: {
    validator: 'new'
  },
  render: h => h(App)
}).$mount("#app");
