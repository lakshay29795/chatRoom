import io from "socket.io-client";
import fs from 'fs';
// window.onbeforeunload = function(event) {
//   alert('window.somefunction');
//   return '';
// }s
export default {
  name: "chatscreen",
  props: {
    userName: {
      type: String,
      required: true
    }
  },
  watch: {
    messageInput(nval, oval) {
      if (this.typingUsers.indexOf(this.userName) === -1) {
        if (nval.length > 0) {
          console.log("emit typing");
          this.socket.emit("Typing", this.userName);
        }
      }
      if (nval.length === 0) {
        this.socket.emit("notTyping", this.userName);
      }
    }
  },
  created() { },
  mounted() {
    this.socket.emit("user_added", this.userName);
    this.socketMap.forEach(element => {
      this.socket.on(element.event, element.function);      
    });
  },
  destroyed() { },
  data() {
    return {
      users: [],
      typingUsers: [],
      messageInput: "",
      socket: io("localhost:3000"),
      messages: [],
      socketMap: [
        {
          event: 'set_users',
          function: this.set_users_function,
        },
        {
          event: 'prev_msgs',
          function: this.prev_msgs_function,
        },
        {
          event: 'addUser',
          function: this.addUser_function,
        },
        {
          event: 'usersTyping',
          function: this.usersTyping_function,
        },
        {
          event: 'removeUserTyping',
          function: this.removeUserTyping_function,
        },
        {
          event: 'message',
          function: this.message_function,
        },
      ]
    };
  },
  //  ready: function () {
  //           // window.onbeforeunload = this.leaving();
  //           // window.onblur = this.leaving;
  //           //window.onmouseout = this.leaving;

  //       },
  methods: {
    // leaving() {
    //   alert('leaving');
    // },
    sendMsg(eve) {
      if (this.messageInput.length !== 0) {
        var obj = {
          user: this.userName,
          msg: this.messageInput,
          type: "text"
        };
        this.messageInput = "";
        this.socket.emit("send-message", obj);
      }
    },
    sendImage(e) {
      console.log("path ", e.target.files[0]);
      var fileData = e.target.files[0];

      let obj = {
        user: this.userName,
        msg: "",
        type: `image/${fileData.name.split('.')[1]}`,
      };
      // console.log('fs',fs);
      // const readstream = fs.createReadStream('/static/images/hi.png');
      // var reader = new FormData();
      // reader.append("file", fileData);
      // console.log("filedata", reader);
      obj.msg = fileData;
      console.log("read", obj.msg);
      this.socket.emit("send-message", obj);
      console.log("sending image");
    },
    set_users_function(data) {
      this.users = data;
    },
    prev_msgs_function(data) {
      this.messages = data;
    },
    addUser_function(data) {
      this.users.push(data);
    },
    usersTyping_function(data) {
      if (this.typingUsers.indexOf(data) === -1) {
        this.typingUsers.push(data);
        console.log(this.typingUsers, this.typingUsers.includes(this.userName));
      }
    },
    removeUserTyping_function(data) {
      this.typingUsers.splice(this.typingUsers.indexOf(data), 1);
    },
    message_function(data) {
      if (data.type.includes('image') !== -1) {
        //not pushing imagedata to messages array
        this.messages.push(data);
      } else {
        this.messages.push(data);
      }
    }
  }
};