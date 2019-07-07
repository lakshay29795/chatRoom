import io from "socket.io-client";
import Vue from 'vue';
import axios from 'axios'
import configData from '@/config';

let socket = configData.socketConnection;
export default {
  send: function(key, data, callback) {
    console.log('3333333', key, data, callback);
    if (!key || !data) return;
    socket.emit(key, data);
    if (callback) callback();
  },
  on: function(key, callback) {
    console.log('message subscribed', key, callback);
    socket.on(key, callback);
  },
  httpRequest: function(type, key, data, callback) {
    console.log('99999', this);
    if (type === 'GET') {
      axios.get(`http://localhost:3000/api/posts/${key}`)
      .then(response => response)
      .catch(err => {
        console.log(err);
      });
    } else if (type === 'POST') {
      axios.post(`http://localhost:3000/api/posts/${key}`, data.data, data.config)
      .then(response => {
        callback(response);
      })
      .catch(err => {
        console.log(err);
      });
    }
  },
};

// export const Messages = Vue.extend({
//   data() {
//     return {
//       name: 'messages',
//     };
//   },
//   methods: {
//     send(key, callback) {
//       console.log('Send function called', key);
//     },
//   },
// });