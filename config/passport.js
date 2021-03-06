var LocalStrategy = require('passport-local').Strategy;
var models = require('../model/db_models');
module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    var User = models.User();
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
    var User = models.User();
    if(req.body.action == "login"){
      User.findOne({ 'email' :  email }, function(err, user) {
        if (err){
          return done(err);
        }
        if (!user){
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        }
        if (!user.validPassword(req.body.password)){
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        }
        return done(null, user);
      });
    }else{
      process.nextTick(function() {
        User.findOne({ 'email' :  email }, function(err, user) {
          if (err)
          return done(err);
          if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {
            var newUser = new User();
            newUser.name = req.body.name;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.role = "admin";
            newUser.save(function(err) {
              if (err)
              throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }
  }));
};
