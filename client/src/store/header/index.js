import { headerData } from './data';
const state = {
  headerOptions: headerData,
};

const getters = {
  getHeaderOptions: (state) => (headerOption) => {
    console.log('header store  ', state.headerOptions)
    return state.headerOptions[headerOption].items;
  },
};
const mutations = {

};

const actions = {

};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
  modules: {
  },
};