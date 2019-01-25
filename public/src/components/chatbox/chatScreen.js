import io from "socket.io-client";
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
  created() {
  },
  mounted() {
    this.socket.emit("user_added", this.userName);
    this.socketMap.forEach(element => {
      this.socket.on(element.event, element.function);
    });
    this.messageWindow = document.querySelectorAll('.message-content')[0];
    this.messageWindowWrapper = document.querySelectorAll('.message-content-wrapper')[0];
    // this.messageWindowWrapper.scrollTop = 600;
  },
  destroyed() { },
  data() {
    return {
      users: [],
      typingUsers: [],
      messageInput: "",
      socket: io("localhost:3000"),
      messages: [],
      messageWindow: 0,
      messageWindowWrapper: 0,
      showMsgTimeInfo: '',
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
  computed: {
  },
  methods: {
    // leaving() {
    //   alert('leaving');
    // },
    sendMsg(eve) {
      if (this.messageInput.length !== 0) {
        var obj = {
          user: this.userName,
          msg: this.messageInput,
          type: "text",
          time: '',
        };
        this.messageInput = "";
        obj.time = new Date().toString();
        console.log('tets', new Date(), obj.time);
        this.socket.emit("send-message", obj);
      }
      this.scroll();
    },
    sendImage(e) {
      console.log("path ", e.target.files[0]);
      var fileData = e.target.files[0];

      let obj = {
        user: this.userName,
        msg: "",
        type: `image/${fileData.name.split('.')[1]}`,
        time: '',
      };
      obj.msg = fileData;
      obj.time = new Date().toString();
      this.socket.emit("send-message", obj);
      this.scroll();
    },
    scroll() {
      console.log('in scroll function');
      var messageContent = document.querySelector('#scrolling');
      console.log(messageContent.offsetHeight, this.messageWindow.offsetHeight, messageContent.offsetHeight - this.messageWindow.offsetHeight);
      if (messageContent.offsetHeight > this.messageWindow.offsetHeight) {
        this.messageWindowWrapper.scrollTop = messageContent.offsetHeight - this.messageWindow.offsetHeight;
        console.log(this.messageWindowWrapper.scrollTop);
      }
    },
    getTime(date) {
      console.log(date);
      let time = '';
      let arr = date.split(':');
      let arr2 = arr[0].split(' ');
      time = arr2[arr2.length - 1] + ':' + arr[1];
      if(parseInt(arr2[arr2.length - 1], 10) < 12) {
        time += ' AM';
      } else {
        time += ' PM';
      }
      return time;
      // console.log('minutes', time);
    },
    showTime(date) {
      this.showMsgTimeInfo = date;
      let time = '';
      var arr = date.split(' ');
      console.log('test', arr);
      time = `${arr[1]} ${arr[2]} ${arr[3]}`;
      let timeout = setTimeout(() => {
        this.showMsgTimeInfo = '';
        clearTimeout(timeout);
      }, 1000);
      return time;
    },
    hoverTime(date) {
      if(this.showMsgTimeInfo === date) {
        return true;
      }
      return false;
    },
    // socket callBack functions below
    set_users_function(data) {
      this.users = data;
    },
    prev_msgs_function(data) {
      this.messages = data;
      // nextTick because messages are loaded into dom after the function call
      this.$nextTick(() => {
        console.log('calling scroll from prev_msgs');
        this.scroll();
      });
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
      this.scroll();
    }
  }
};