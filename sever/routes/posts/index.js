var express = require('express');
var router = express.Router();
var dbData = require('../../db.model');
var passport = require('../../authentication/auth.js')
var bcrypt = require('bcrypt');

var userData = dbData.users;
router.use(passport.initialize());
router.use(passport.session());
router.get('/', (req, res) => {
  res.send('');
})
router.get('/login', (req, res) => {
  res.send('login');
})

router.get('/register', (req, res) => {
  console.log('calling register');
  res.send('login');
})
router.post('/', (req, res) => {
})

router.post('/login', (req, res, next) => {
  console.log('login request came', req.body);
  // res.send(req.body);
  passport.authenticate('local', function (err, user, info) {
    console.log('in here');
    if (err) res.send('login');
    else if (!user) res.send('register');
    else if (user) res.send('chatscreen');
  })(req, res, next)
})

router.post('/register', (req, res, next) => {
  userData.findOne({ username: req.body.username}, function(err, user) {
    if (err) {
      res.send(err);
      throw err;
    } else if (!user) {
      let newUser = new userData(req.body);
      bcrypt.genSalt(8, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          else {
            newUser.password = hash;
            newUser.save(function(err, data) {
              if (err) {
                console.log('error saving new user  ', err);
              } else {
                res.send('chatscreen');
              }
            });
          }
        })
      })
    }
  })
})




module.exports = router;