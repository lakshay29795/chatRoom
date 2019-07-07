var passport = require('passport')
var localStrategy = require('passport-local').Strategy
var dbData = require('../db.model');
var posts = require('../routes/posts/index');
var bcrypt = require('bcrypt');

var userData = dbData.users;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if(err) {
      console.error('There was an error accessing the records of' +
      ' user with id: ' + id);
      return console.log(err.message);
    }
    return done(null, user);
  })
});

passport.use('local', new localStrategy(
  function (username, password, done) {
    console.log('in localstrategy')
    userData.findOne({ username: username }, function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'No user found' });
      if (user.isActive) return done(null, false, { message: 'user already signed in' });
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        else if(isMatch) {
          return done(null, user);
        } else {
          if (user.password !== password) return done(null, false, { message: 'Incorrect Password' });
        }
      })
    })
  }
))

module.exports = passport;