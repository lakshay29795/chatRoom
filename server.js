var http = require('http');
var express = require('express');
var path = require('path');
var cors = require('cors');
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
var userData = dbData.users;

app.use('/api/posts', posts);
var io = require('socket.io')(server);
io.on('connection', (socket) => {
  socket.on('user_added', (data) => {
    prevMsg = [];
    mesgData.find({}).exec((err, slang) => {
      if (err) {
        console.log(err);
      } else {
        slang.forEach(element => {
          var obj = {
            user: element.user,
            msg: element.msg,
          };
          prevMsg.push(obj);
        });
        socket.emit('prev_msgs', prevMsg);
      }
    });
    var newUser = new userData({
      username: data,
      socketId: socket.id,
    });
    io.emit('addUser', data);
    newUser.save((err, user) => {
      if (err) {
        console.log('error saving user', err);
      } else {
          var users = [];
          userData.find({}).exec((err, user) => {
            if (err) {
              cosnole.log('error fetching user');
            } else {
              user.forEach((element) => {
                users.push(element.username);
              });
              socket.emit('prev_users', users);
            }
          })
      }
    })

  })
  socket.on('Typing', (data) => {
    io.emit('usersTyping', data);
  })
  socket.on('notTyping', (data) => {
    io.emit('removeUserTyping', data);
  })
  socket.on('send-message', (data) => {

    var newMsgInfo = new mesgData({
      user: data.user,
      msg: data.msg,
    });
    newMsgInfo.save(function (err, savedMsg) {
      if (err) {
        console.log(err);
      } else {
      }
    })
    io.emit('message', data);
  })
  socket.on('disconnect', ()=> {
    console.log('deleterequest', socket.id);
    userData.find({'socketId': socket.id}). exec((err, user)=>{
      if(err) {
        console.log('no user found to delete');
      } else {
          user.forEach(element => {        
          io.emit('disconnectUser', element.username);
          userData.findOneAndRemove({ 'socketId': socket.id },(err, user)=> {
            if (err) {
              console.log('error deleting');
            }
            else {
              console.log('successfully deleted');
            }
          }); 
        })
      }
    })
 
  })
});
console.log('server running at port 3000');
