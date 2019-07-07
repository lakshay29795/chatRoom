import Vue from "vue";
import Vuex from "vuex";
import chat from "./chat";
import settings from "./settings";
import header from "./header";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    namespaced: true,
    chat,
    header,
    settings,
  },
});
