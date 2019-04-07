var http = require('http');
var express = require('express');
var path = require('path');
var cors = require('cors');
var fs = require('fs');
var app = express();
var mongoose = require('mongoose');
var esm = require('esm')(module/*, options*/);
// import socketFunctions from './socket/index';
// mongoose.Promise = global.Promise;
// import configData from './config/config';
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
// var userData = dbData.users;
app.use(express.static(__dirname + '/serverFiles'));
app.use('/api/posts', posts);
var io = require('socket.io')(server);
var socketFunctions = require('./socket/index')(io);


console.log('server running at port 3000');
