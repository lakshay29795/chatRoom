import Vue from "vue";
import Vuex from "vuex";
import chat from "./chat";
import settings from "./settings";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    chat,
    settings,
  },
});
