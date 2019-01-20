var http = require('http');
var express = require('express');
var path = require('path');
var cors = require('cors');
var fs = require('fs');
var app = express();
var mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://abc123:pass123@ds157539.mlab.com:57539/lakshay',
  { useNewUrlParser: true }, function () { }).then(() => {
  }).catch(err => {
    console.log('error in connecting to database');
  });
const port = process.env.PORT || 3000;
var server = app.listen(port);
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());
var posts = require('./routes/posts/index');
var dbData = require('./db.model');
var mesgData = dbData.mesg;
// var userData = dbData.users;

app.use('/api/posts', posts);
var io = require('socket.io')(server);
let currentUsers = [];
let currentMessages = [];
let currentPreviousMessages = [];
let socket_user_map = {};
io.on('connection', (socket) => {
  socket.on('user_added', (data) => {
    if (currentUsers.length === 0) {
      mesgData.find({}).exec((err, slang) => {
        if (err) {
          console.log(err);
        } else {
          slang.forEach(element => {
            const {user, msg, type} = element;
            var obj = {
              user,
              msg,
              type,
            };
            currentPreviousMessages.push(obj);
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
  })
  socket.on('Typing', (data) => {
    io.emit('usersTyping', data);
  })
  socket.on('notTyping', (data) => {
    io.emit('removeUserTyping', data);
  })
  socket.on('send-message', (data) => {
    currentMessages.push(data);
    if (data.type === 'text') {
      io.emit('message', data);
    } else if (data.type === 'image') {
      data.msg = `data:image/png;base64,${data.msg.toString('base64')}`;
      io.emit('message', data);
      // fs.readFile(__dirname + '/public'+ data.msg, function(err, buf) {
      //   if(err) {
      //     console.log('error reading image file', err);
      //   } else {
      //     console.log(data.data);
      //     data.data = {image: true, buffer: `data:image/png;base64,${data.data.toString('base64')}`};
      //     io.emit('message', data);
      //   }

      // })
    }
  })
  socket.on('disconnect', () => {
    let temp = socket.id;
    currentUsers.splice(currentUsers.indexOf(socket_user_map[socket.id]), 1);
    delete socket_user_map[socket.id];
    io.emit('set_users', currentUsers);
    if (currentUsers.length === 0) {
      currentMessages.forEach(element => {
        const { type, msg, user } = element;
        const dbObj = {
          user,
          msg,
          type,
        };
        var newMsgInfo = new mesgData(dbObj);
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

  })
});
console.log('server running at port 3000');
