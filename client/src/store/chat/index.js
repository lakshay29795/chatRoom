import groupChat from "./groupChat"
import personalChat from "./personalChat"

const state = {
  friendsData: [],
};

const getters = {

};
const mutations = {
  UPDATE_FRIENDS_DATA(state, payload) {
    // type: add, modify, remove friends data
    // all: remove/add all or not
    // data: data to be removed or added or modified
    // newData: if to be modified then new data
    console.log('UPDATE_FRIENDS_DATA', payload);
    const { type, all, data } = payload;
    if (type === 'ADD') {
      data.forEach(element => {
        state.friendsData.push(element);        
      });
    } else if (type === 'DELETE') {
      if (all) state.friendsData = [];
      else {
        //find the friends data and delete it try to get unique key for each friend like id from db
      }
    } else if (type === 'MODIFY') {
      // for each element in data replace with new data
    }
  }

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
    groupChat,
    personalChat,
  },
};