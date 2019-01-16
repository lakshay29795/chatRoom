<template>
  <div class="chat-window">
    <div class="user-window">
      <div class="user-heading">
        <h2>USERS</h2>
      </div>
      <div class="user-list" v-for="(user) in users" :key="user">
        {{user}}
        <div v-if="typingUsers.includes(user)" class="pencil">&#9998;</div>
      </div>
    </div>
    <div class="message-window">
      <div class="userInfo">USER {{userName}}</div>
      <div class="message-content">
        <div class="message-content-scroll">
          <div
            class="msg-box"
            v-for="(msg, index) in messages"
            :class="{'this-user': msg.user === userName}"
            :key="index"
          >
            <div class="msg-user" v-if="msg.user !== userName">{{msg.user}}</div>
            <div class="msg-text" v-if="msg.type === 'text'">{{msg.msg}}</div>
            <div
              class="msg-image"
              v-else-if="msg.type === 'image'"
              :style="{ 'background-image': 'url(' + msg.msg + ')' }"
            ></div>
          </div>
        </div>
      </div>
      <div class="typing-window">
        <form id="form1" action @submit.prevent="sendMsg">
          <input class="inputField" type="text" v-model="messageInput">
          <input class="sendButton" type="submit" value="SEND">
          <input class="sendImg" id="browse-file" value="image" type="file" @change="sendImage">
        </form>
      </div>
    </div>
  </div>
</template>
<script>
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
  created() {},
  mounted() {
    console.log("newUser");
    this.socket.emit("user_added", this.userName);
    this.socket.on("set_users", data => {
      console.log("prevusers", data);
      this.users = data;
    });
    this.socket.on("prev_msgs", data => {
      this.messages = data;
    });
    this.socket.on("addUser", data => {
      this.users.push(data);
    });
    this.socket.on("usersTyping", data => {
      if (this.typingUsers.indexOf(data) === -1) {
        this.typingUsers.push(data);
        console.log(this.typingUsers, this.typingUsers.includes(this.userName));
      }
    });
    this.socket.on("removeUserTyping", data => {
      this.typingUsers.splice(this.typingUsers.indexOf(data), 1);
    });
    this.socket.on("message", data => {
      if(data.image) {
        
      }
      this.messages.push(data);
    });
  },
  beforeDestroy() {
    // alert('beforedstroy');
  },
  destroyed() {},
  data() {
    return {
      users: [],
      typingUsers: [],
      messageInput: "",
      socket: io("localhost:3000"),
      messages: [], 
      urlTemp: '',
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
      console.log('path ', e.target.files[0]);
      var fileData = e.target.files[0];
      
      let obj = {
        user: this.userName,
        msg: "/src/static/images/hi.png",
        type: "image",
        data: "",
      };
      var reader = new FileReader();
      console.log(reader);
      reader.onload = function(e){
      var dataURL = reader.result;
      console.log('dataurl', dataURL);
    };
      this.socket.emit("send-message", obj);
      console.log("sending image");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./variables.scss";
.chat-window {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //   display: flex;
  //   flex-wrap: wrap;
  align-items: flex-start;
  white-space: nowrap;
  .user-window {
    position: relative;
    width: 400 * $s;
    height: 1076 * $s;
    display: inline-block;
    vertical-align: top;
    // flex-wrap: wrap;
    border: 2 * $s solid grey;
    .user-heading {
      position: relative;
      width: 100%;
      height: 50 * $s;
    }
    .user-list {
      position: relative;
      font-size: 24 * $s;
      width: 90%;
      height: 30 * $s;
      .pencil {
        display: inline-block;
      }
    }
  }
  .message-window {
    position: relative;
    height: 1076 * $s;
    width: 1300 * $s;
    display: inline-block;
    border: 2 * $s solid grey;
    .userInfo {
      position: relative;
      width: 100%;
      height: 70 * $s;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .message-content {
      position: absolute;
      width: 100%;
      height: 881 * $s;
      // overflow: scroll;
      .message-content-scroll {
        position: absolute;
        width: 100%;
        height: auto;
        bottom: 0;
        // overflow: hidden;
        .msg-box {
          position: relative;
          width: 1240 * $s;
          margin-left: 20 * $s;
          margin-right: 20 * $s;
          height: auto;
          margin-bottom: 40 * $s;
          // background-color: whitesmoke;
          &.this-user {
            display: flex;
            // align-items: right;
            justify-content: flex-end;
          }
          .msg-user {
            position: relative;
            text-align: left;
            font-size: 30px;
            width: 60%;
            color: brown;
          }
          .msg-text {
            position: relative;
            text-align: left;
            font-size: 20px;
            width: auto;
            max-width: 744 * $s;
            color: cornflowerblue;
            word-wrap: break-word;
            white-space: pre-wrap;
            //interesting thing happens for overflowing text with below lines
            // overflow: hidden;
            // text-overflow: ellipsis;
          }
          .msg-image {
            position: relative;
            width: 100px;
            height: 100px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }

    .typing-window {
      position: absolute;
      width: 100%;
      height: 100 * $s;
      bottom: 25 * $s;
      // vertical-align: top;
      .inputField {
        position: absolute;
        left: 5%;
        width: 950 * $s;
        height: 100%;
        border: 1 * $s solid black;
        // display: inline-block;
      }
      .sendButton {
        position: absolute;
        width: 100 * $s;
        height: 100%;
        left: 1050 * $s;
        // display: inline-block;
      }
      .sendImg {
        position: absolute;
        width: 100 * $s;
        height: 100%;
        left: 1175 * $s;
        text-align: center;
        line-height: 97px;
        font-size: 43px;
        background-color: rgb(225, 227, 227);
      }
    }
  }
}
</style>
