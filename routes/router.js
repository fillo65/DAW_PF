var log = require("./log_list");
/*--------------*/
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}
/*--------------*/
module.exports = function(app, passport){
  /*==========================================================*/
  app.get('/', isLoggedIn, function(req, res) {
    res.render('index.ejs', {title: "Log in"});
  });

  /*==========================================================*/
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

  /*==========================================================*/
  // app.get('/profile', isLoggedIn, function(req, res) {
  //   res.render('log.ejs', {
  //     user : req.user
  //   });
  // });
  /*==========================================================*/
  app.get('/log', isLoggedIn, function(req, res) {
    var Log = require('../model/log_model');
    Log.findAll().exec(function (err, logs) {
      if (!err) {
        res.render('log', {logs: logs});
      } else {
        console.log(err);
      }
    });
  });
  app.get('/log/new', isLoggedIn, function(req, res) {
    res.render('log_new', {});
  });

  app.post('/log', isLoggedIn, function(req, res) {
    var Log = require('../model/log_model');
    if (Log.saveData(req.body)) {
      res.redirect('/log');
    } else {
      res.redirect('/log/new');
    }
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
        res.render('log_edit', {log: result});
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
};
//   //Create log
//   router.post('/log', log.log_save);

//   //pagina de creacion nuevo
//   router.get('/log/new', log.new);
//   //pagina de edicion nuevo
//   //Delete Log
//   //Update Log
// };
//
// // var express = require('express')
// //         , methodOverride = require('method-override');
// // //
// // var router = express.Router();
// // var file_index = require("./index");
// // var file_log_list = require("./log_list");
// //
// // //Middle ware that is specific to this router
// // router.use(function timeLog(req, res, next) {
// //     console.log('Time: ', Date.now());
// //     next();
// // });
// // //
// // router.use(methodOverride(function (req, res) {
// //     if (req.body && typeof req.body === 'object' && '_method' in req.body) {
// //         var method = req.body._method;
// //         delete req.body._method;
// //         return method;
// //     }
// // }));
// //
// //
// // //----------------Raiz
// // router.get('/', file_index.index);
//
// // router.get('/home', file_index.index);
// //
// // //----------------pagina de lista de logs
//
// //---------------- Pagina de Alumnos
// // router.get('/alumnos', file_log_list.log_list);
// // //Create log
// // router.post('/alumnos', file_log_list.log_save);
// // //pagina de creacion nuevo
// // router.get('/alumnos/new', file_log_list.new);
// // //pagina de edicion nuevo
// // router.get('/alumnos/edit/:id', file_log_list.findById);
// // //Delete Log
// // router.delete('/alumnos/edit/:id', file_log_list.delete);
// // //Update Log
// // router.put('/alumnos/:id', file_log_list.edit);
//
// //exportar la funcion para que la use app
