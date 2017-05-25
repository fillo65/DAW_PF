/*--------------*/
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.render('login.ejs', { message: req.flash('loginMessage') });
}
/*--------------*/
module.exports = function(app, passport){
  /*============================  Principal  ==============================*/
  app.get('/', isLoggedIn, function(req, res) {
    res.render('index.ejs', {title: "Log in"});
  });

  app.get('/home', isLoggedIn, function(req, res) {
    res.redirect('/');
  });
  /*============================  Login   ==============================*/
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local-signup-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
  }));

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  /*============================  1.users ==============================*/
  var UserModel = require('../model/users_db');
  app.get('/users', isLoggedIn, function(req, res) {
    UserModel.findAll().exec(function (err, data) {
      console.log(err);
      if (!err) {
        res.render('1.users/user', {data: data});
      } else {
        console.log(err);
      }
    });
  });

  app.get('/users/new', isLoggedIn, function(req, res) {
    res.render('1.users/user_new');
  });

  app.post('/users', isLoggedIn, function(req, res) {
    if (UserModel.saveData(req.body)) {
      res.redirect('/users');
    } else {
      res.redirect('/users/new');
    }
  });

  app.get('/users/edit/:id', isLoggedIn, function(req, res) {
    UserModel.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        res.render('1.users/user_edit', {data: result});
      } else {
        console.log("err");
      }
    });
  });

  app.put('/users/:id', isLoggedIn, function(req, res) {
    UserModel.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        console.log("updating...");
        if (UserModel.updateData(req.body, req.params.id)) {
          res.redirect('/users');
        } else {
          res.redirect('/users/edit' + req.params.id);
        }
      } else {
        console.log("err");
      }
    });
  });

  app.delete('/users/edit/:id', isLoggedIn, function(req, res) {
    UserModel.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        UserModel.removeData(result).exec(function (err) {
          if (err) {
            console.log("!err");
            res.send(err.message);
          } else {
            res.redirect('/users');
          }
        });
      } else {
        console.log("err");
      }
    });
  });
  /*============================  2.aulas ==============================*/
  app.get('/aulas', isLoggedIn, function(req, res) {
    var AulasModel = require('../model/aulas_db');
    AulasModel.findAll().exec(function (err, data) {
      console.log(err);
      if (!err) {
        res.render('2.aulas/aula', {data: data});
      } else {
        console.log(err);
      }
    });
  });
  app.get('/aulas/new', isLoggedIn, function(req, res) {
    res.render('2.aulas/aula_new');
  });
  app.post('/aulas', isLoggedIn, function(req, res) {
    var User = require('../model/aulas_db');
    if (User.saveData(req.body)) {
      res.redirect('/aulas');
    } else {
      res.redirect('/aulas/new');
    }
  });

  app.get('/aulas/edit/:id', isLoggedIn, function(req, res) {
    var AulasModel = require('../model/aulas_db');
    AulasModel.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        res.render('2.aulas/aula_edit', {data: result});
      } else {
        console.log("err");
      }
    });
  });

  app.put('/aulas/:id', isLoggedIn, function(req, res) {
    var AulasModel = require('../model/aulas_db');
    AulasModel.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        console.log("updating...");
        if (AulasModel.updateData(req.body, req.params.id)) {
          res.redirect('/aulas');
        } else {
          res.redirect('/aulas/edit' + req.params.id);
        }
      } else {
        console.log("err");
      }
    });
  });

  app.delete('/aulas/edit/:id', isLoggedIn, function(req, res) {
    var AulasModel = require('../model/aulas_db');
    AulasModel.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        AulasModel.removeData(result).exec(function (err) {
          if (err) {
            console.log("!err");
            res.send(err.message);
          } else {
            res.redirect('/aulas');
          }
        });
      } else {
        console.log("err");
      }
    });
  });
  /*============================  3.calendar ==============================*/
  app.get('/calendar', isLoggedIn, function(req, res) {
    // var CalendarModel = require('../model/calendar_db');
    // CalendarModel.findAll().exec(function (err, data) {
    // console.log(err);
    // if (!err) {
    res.render('3.calendar/calendar', {});
    // } else {
    //   console.log(err);
    // }
    // });
  });
  /*============================  4.logs ==============================*/
  app.get('/log', isLoggedIn, function(req, res) {
    var Log = require('../model/log_model');
    Log.findAll().exec(function (err, logs) {
      if (!err) {
        res.render('4.logs/log', {logs: logs});
      } else {
        console.log(err);
      }
    });
  });
  app.get('/log/new', isLoggedIn, function(req, res) {
    res.render('4.logs/log_new', {});
  });

  app.post('/log', isLoggedIn, function(req, res) {
    var Log = require('../model/log_model');
    if (Log.saveData(req.body)) {
      res.redirect('/log');
    } else {
      res.redirect('/log/new');
    }
  });

  app.get('/log/edit/:id', isLoggedIn, function(req, res) {
    var Log = require('../model/log_model');
    Log.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        res.render('4.logs/log_edit', {log: result});
      } else {
        console.log("err");
      }
    });
  });

  app.delete('/log/edit/:id', isLoggedIn, function(req, res) {
    var Log = require('../model/log_model');
    Log.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        Log.removeData(result).exec(function (err) {
          if (err) {
            console.log("!err");
            res.send(err.message);
          } else {
            res.redirect('/log');
          }
        });
      } else {
        console.log("err");
      }
    });
  });

  app.put('/log/:id', isLoggedIn, function(req, res) {
    var Log = require('../model/log_model');
    Log.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        console.log("updating...");
        if (Log.updateData(req.body, req.params.id)) {
          res.redirect('/log');
        } else {
          res.redirect('/log/edit' + req.params.id);
        }
      } else {
        console.log("err");
      }
    });
  });

  /*============================  5.config ==============================*/
  app.get('/config', isLoggedIn, function(req, res) {
    // var CalendarModel = require('../model/calendar_db');
    // CalendarModel.findAll().exec(function (err, data) {
    // console.log(err);
    // if (!err) {
    res.render('5.settings/settings', {});
    // } else {
    //   console.log(err);
    // }
    // });
  });
  /*============================  5.config servicios ==============================*/
  app.get('/config/servicios', isLoggedIn, function(req, res) {
    // var ServiciosModel = require('../model/servicios_db');
    // ServiciosModel.findAll().exec(function (err, data) {
    // console.log(err);
    // if (!err) {
    res.render('5.1.servicios/servicios', {});
    // } else {
    //   console.log(err);
    // }
    // });
  });

  /*============================  5.config ediciones ==============================*/
  app.get('/config/ediciones', isLoggedIn, function(req, res) {
    // var EdicionesModel = require('../model/ediciones_db');
    // EdicionesModel.findAll().exec(function (err, data) {
    // console.log(err);
    // if (!err) {
    res.render('5.2.ediciones/ediciones', {});
    // } else {
    //   console.log(err);
    // }
    // });
  });

};
