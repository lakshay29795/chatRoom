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
    console.log('fouund err');
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
let socket_user_map ={};
io.on('connection', (socket) => {
  socket.on('user_added', (data) => {
    if(currentUsers.length === 0) {
      console.log('first user added');
      mesgData.find({}).exec((err, slang) => {
        if (err) {
          console.log(err);
        } else {
          slang.forEach(element => {
            var obj = {
              user: element.user,
              msg: element.msg,
              type: element.type,
            };
            currentPreviousMessages.push(obj);
          });
          socket.emit('prev_msgs', currentPreviousMessages);
        }
      });
    } else {
      socket.emit('set_users', currentUsers);
      console.log('previous chat', currentPreviousMessages);
      console.log('recent chat', currentMessages);
      console.log('combine chat',  [...currentPreviousMessages, ...currentMessages]);
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
    if(data.type === 'text') {
      io.emit('message', data);
    } else if (data.type === 'image') {
      fs.readFile(__dirname + '/public'+ data.msg, function(err, buf) {
        if(err) {
          console.log('error reading image file');
        } else {
          io.emit('message', {image: true, buffer: buf.toString('base64')});
        }

      })
    }
  })
  socket.on('disconnect', ()=> {
    console.log('deleterequest', socket_user_map[socket.id]);
    let temp = socket.id;
    currentUsers.splice(currentUsers.indexOf(socket_user_map[socket.id]) , 1);
    console.log('remaining users', currentUsers, currentMessages);
    delete socket_user_map[socket.id];
    io.emit('set_users', currentUsers);
    if(currentUsers.length === 0) {
      currentMessages.forEach(element => {
        var newMsgInfo = new mesgData({
          user: element.user,
          msg: element.msg,
          type: element.type,
        });
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
