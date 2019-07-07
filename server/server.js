var http = require('http');
var express = require('express');
var path = require('path');
var cors = require('cors');
var fs = require('fs');
var app = express();
var mongoose = require('mongoose');
const session = require('express-session');
var esm = require('esm')(module/*, options*/);
// import socketFunctions from './socket/index';
// mongoose.Promise = global.Promise;
var configData = require('./config/config');
mongoose.connect(configData.DBdata.key,
  { useNewUrlParser: true }, function () { }).then(() => {
  }).catch(err => {
    console.log('error in connecting to database');
  });
const port = process.env.PORT || 3000;
var server = app.listen(port);
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
//passport authentication
// var auth = require('./authentication/auth.js')

var posts = require('./routes/posts/index');
// var userData = dbData.users;
app.use(express.static(__dirname + '/serverFiles'));
app.use('/api/posts', posts);
var io = require('socket.io')(server);
var socketFunctions = require('./socket/index')(io);


console.log('server running at port 3000');
