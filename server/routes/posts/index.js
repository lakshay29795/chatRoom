var express = require('express');
var router = express.Router();
var dbData = require('../../db.model');
var serverConfig = require('../../config/config');
var passport = require('../../authentication/auth.js')
var utilityFunctions = require('../../utilityFunctions');
var fs = require('fs');
var bcrypt = require('bcrypt');
var multer = require("multer");

// var storage = multer.memoryStorage();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './serverFiles')
  },
  filename: function (req, file, cb) {
    console.log('name ', req.body, file);
    const filename = `${req.body.username}.${file.originalname.split('.')[1]}`;
    cb(null, filename)
  }
})

var upload = multer({ storage: storage })

var userData = dbData.users;
router.use(passport.initialize());
router.use(passport.session());
router.get('/', (req, res) => {
  res.send({redirect: ''});
})
router.get('/login', (req, res) => {
  res.send({redirect: 'login'});
})

router.get('/register', (req, res) => {
  console.log('calling register');
  res.send({redirect: 'register'});
})
router.post('/', (req, res) => {
  res.send('hello');
})

router.post('/login', (req, res, next) => {
  console.log('login request came', req.body);
  // res.send(req.body);
  passport.authenticate('local', function (err, user, info) {
    console.log('1111111', user);
    if (err) res.send({redirect: 'login'});
    else if (!user) res.send({redirect: 'register'});
    else if (user) res.send({redirect: 'chatscreen'});
  })(req, res, next)
})

router.post('/register', upload.single('stream'), (req, res, next) => {
  userData.findOne({ username: req.body.username}, function(err, user) {
    console.log('in register');
    if (err) {
      res.send(err);
      throw err;
    } else if (!user) {
      let newUser = new userData(req.body);
      console.log('add user', req.body.username);
      newUser.friends = [];
      newUser.groups = [];
      newUser.profilePicture = `${serverConfig.serverData.serverAddress}${req.body.username}.${req.body.profilePicture}`;
      bcrypt.genSalt(8, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          else {
            newUser.password = hash;
            newUser.save(function(err, data) {
              if (err) {
                console.log('error saving new user  ', err);
              } else {
                res.send({redirect: 'chatscreen'});
              }
            });
          }
        })
      })
    } else if (user) {
      console.log('user already exists');
      res.send('login');
    }
  })
})




module.exports = router;