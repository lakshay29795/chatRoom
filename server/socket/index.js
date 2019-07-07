var dbData = require('../db.model');
var fs = require('fs');
var utilityFunctions = require('../utilityFunctions');
var mesgData = dbData.mesg;
var userData = dbData.users;
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
    let fileName = socket_user_map[socket.id]+ utilityFunctions.randomString() + '.' + data.type.split('/')[1];
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

const getFriendsList = (data, socket, io) => {
  console.log('user to be searched', data);
  userData.findOne({username: data.username}).exec((err, user) => {
    if (err) {
      console.log(err);
    } else {
      let promises = [];
      user.friends.forEach((friend) => {
        let p = new Promise((resolve, reject) => {
          userData.findOne({username: friend}).exec((error, friendData) => {
            if (error) {
              console.log(error);
            } else {
              resolve(friendData);
            }
          })
        });
        promises.push(p);
      })
      Promise.all(promises).then(friends => {
        // console.log('----friends', friends);
        socket.emit('friendsList', friends);
      })
    }
  })
};

const updateProfilePicture = (data, socket, io) => {
  userData.findOne({username: data.username}).exec((err, user) => {
    if (err) {
      console.log(err)
    } else {
      let fileName = data.username + utilityFunctions.randomString() + '.' + data.type;
      let filePath = `./serverFiles/${fileName}`;
      var writestream = fs.createWriteStream(`${filePath}`);
      // console.log('chunc type =========> ', user, data.data);
      writestream.write(data.data);
      user.profilePicture = `http://localhost:3000/${fileName}`;
    }
  })
}

const getAllUsers = (username, socket, io) => {
  userData.find({username: {$ne: username}}, {username: true, name: true, profilePicture: true}).exec((err, usernameList) => {
    if (err) {
      console.log("no users found by query");
    } else {
      socket.emit('allUsers', usernameList);
    }
  });
}

dataEvents = {
  'userAdded': userAdded,
  'isTyping': typing,
  'notTyping': notTyping,
  'sendMessage': sendMessage,
  'disconnect': disconnect,
  'getFriendsList': getFriendsList,
  'updateProfilePicture': updateProfilePicture,
  'getAllUsers': getAllUsers,
};
module.exports = function(io) {
  io.on('connection', (socket) => {
    socket.on('userAdded', (data) => { dataEvents['userAdded'](data, socket, io); });
    socket.on('getFriendsList', (data) => { dataEvents['getFriendsList'](data, socket, io); });
    socket.on('updateProfilePicture', (data) => { dataEvents['updateProfilePicture'](data, socket, io); });
    socket.on('isTyping', (data) => { dataEvents['isTyping'](data, socket, io); });
    socket.on('notTyping', (data) => { dataEvents['notTyping'](data, socket, io); });
    socket.on('sendMessage', (data) => { dataEvents['sendMessage'](data, socket, io); });
    socket.on('disconnect', (data) => { dataEvents['disconnect'](data, socket, io); });
    socket.on('getAllUsers', (data) => { dataEvents['getAllUsers'](data, socket, io); });
  });
}