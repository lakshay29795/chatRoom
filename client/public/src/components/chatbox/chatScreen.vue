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
        <div class="message-content-wrapper">
          <div class="message-content-scroll" id="scrolling">
            <div
              class="msg-box"
              v-for="(msg, index) in messages"
              :class="{'this-user': msg.user === userName}"
              :key="index"
            >
              <div class="msg-user" v-if="msg.user !== userName">{{msg.user}}</div>
              <div class="msg-text" v-if="msg.type === 'text'">{{msg.msg}}</div>
              <div class="msg-image" v-else-if="msg.type.includes('image') !== -1">
                <img class="msg-image-inner" :src="msg.msg" alt>
              </div>
              <div class="msg-time" @mouseover="showTime(msg.time)">
                {{getTime(msg.time)}}
                <div class="msg-time-hover" v-if="hoverTime(msg.time)">{{showTime(msg.time)}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="typing-window">
        <form id="form1" action @submit.prevent="sendMsg" enctype="multipart/form-data">
          <input class="inputField" type="text" v-model="messageInput">
          <div class="sendButton">
            <input class="sendButton-inner" type="submit">
          </div>
          <div class="sendImg">
            <input class="sendImg-inner" type="file" @change="sendImage">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script src="./chatScreen.js"></script>
<style lang="scss" scoped>
@import "./variables.scss";
.chat-window {
  position: absolute;
  top: 0;
  left: 0;
  width: 1920 * $s;
  height: 1080 * $s;
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
      overflow: hidden;
      .message-content-wrapper {
        overflow: auto;
        position: absolute;
        width: 1500 * $s;
        height: 981 * $s;
        .message-content-scroll {
          position: absolute;
          width: 1300 * $s;
          height: auto;
          padding-bottom: 200 * $s;
          overflow: hidden;
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
              .msg-image-inner {
                position: relative;
                width: 100%;
                height: 100%;
              }
            }
            .msg-time {
              position: relative;
              font-size: 15 * $s;
              color: gray;
              display: flex;
              align-items: flex-end;
              padding-left: 10 * $s;
              // transition: opacity 0.3s ease;
              .msg-time-hover {
                position: absolute;
                top: 28px;
                left: -39px;
                color: black;
                padding-left: 10px;
                padding-right: 10px;
                background-color: gray;
                border-radius: 4px;
                font-size: 17px;
                opacity: 0.7;
              }
            }
          }
        }
      }
    }

    .typing-window {
      position: absolute;
      width: 100%;
      height: 100 * $s;
      bottom: 25 * $s;
      z-index: 2;
      background-color: white;
      // vertical-align: top;
      .inputField {
        position: absolute;
        left: 5%;
        width: 950 * $s;
        height: 100%;
        border: 1 * $s solid black;
        border-radius: 45 * $s;
        outline: none;
        // display: inline-block;
      }
      .sendButton {
        position: absolute;
        width: 100 * $s;
        height: 100%;
        left: 1050 * $s;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("/static/images/send-button.jpg");
        // display: inline-block;
        .sendButton-inner {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
      .sendImg {
        position: absolute;
        width: 100 * $s;
        height: 100%;
        left: 1175 * $s;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("/static/images/select-image-icon.png");
        .sendImg-inner {
          position: relative;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }
}
</style>
