var LocalStrategy = require('passport-local').Strategy;
module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    var User = require('../model/db_models').User();
    console.log("modelUser");
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
    if(req.body.action == "login"){
      var User = require('../model/db_models').User();
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
        var User = require('../model/db_models').User();
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
              delete require.cache[require.resolve('../model/db_models')];
              return done(null, newUser);
            });
          }
        });
      });
    }
  }));
};
