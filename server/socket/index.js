var dbData = require('../db.model');
var fs = require('fs');
var mesgData = dbData.mesg;
let currentUsers = [];
let currentMessages = [];
let currentPreviousMessages = [];
let socket_user_map = {};

const userAdded = (data, socket, io) => {
  if (currentUsers.length === 0) {
    mesgData.find({}).exec((err, slang) => {
      if (err) {
        console.log(err);
      } else {
        slang.forEach(element => {
          // const {user, msg, type} = element;
          // var obj = {
          //   user,
          //   msg,
          //   type,
          // };
          currentPreviousMessages.push(element);
        });
        socket.emit('prev_msgs', currentPreviousMessages);
      }
    });
  } else {
    socket.emit('set_users', currentUsers);
    socket.emit('prev_msgs', [...currentPreviousMessages, ...currentMessages]);
  }
  currentUsers.push(data);
  socket_user_map[socket.id] = data;
  io.emit('addUser', data);
};

const typing = (data, socket, io) => {
  io.emit('usersTyping', data);
};

const notTyping = (data, socket, io) => {
  io.emit('removeUserTyping', data);
};

const sendMessage = (data, socket, io) => {
  if (data.type === 'text') {
  } else if (data.type.includes('image') !== -1) {
    // console.log('pathname', data.msg);
    let fileName = socket_user_map[socket.id]+ randomString() + '.' + data.type.split('/')[1];
    let filePath = `./serverFiles/${fileName}`;
    // console.log('path', data.msg.toString());
    var writestream = fs.createWriteStream(`${filePath}`);
    writestream.write(data.msg);
    // data.msg = `data:image/png;base64,${data.msg.toString('base64')}`;
    data.msg = `http://localhost:3000/${fileName}`;
  }
  io.emit('message', data);
  currentMessages.push(data);
};

const disconnect = (data, socket, io) => {
  let temp = socket.id;
  currentUsers.splice(currentUsers.indexOf(socket_user_map[socket.id]), 1);
  delete socket_user_map[socket.id];
  io.emit('set_users', currentUsers);
  if (currentUsers.length === 0) {
    currentMessages.forEach(element => {
      // const { type, msg, user } = element;
      // const dbObj = {
      //   user,
      //   msg,
      //   type,
      // };
      var newMsgInfo = new mesgData(element);
      newMsgInfo.save(function (err, savedMsg) {
        if (err) {
          console.log(err);
        } else {
        }
      })
    })
    currentMessages = [];
    currentPreviousMessages = [];
  }

};

function randomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
dataEvents = {
  'userAdded': userAdded,
  'isTyping': typing,
  'notTyping': notTyping,
  'sendMessage': sendMessage,
  'disconnect': disconnect,
};
module.exports = function(io) {
  io.on('connection', (socket) => {
    socket.on('userAdded', (data) => { dataEvents['userAdded'](data, socket, io); });
    socket.on('isTyping', (data) => { dataEvents['isTyping'](data, socket, io); });
    socket.on('notTyping', (data) => { dataEvents['notTyping'](data, socket, io); });
    socket.on('sendMessage', (data) => { dataEvents['sendMessage'](data, socket, io); });
    socket.on('disconnect', (data) => { dataEvents['disconnect'](data, socket, io); });
  });
}