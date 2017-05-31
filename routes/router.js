/*--------------*/
function isLoggedIn(req, res, next) {
  // if (req.isAuthenticated()){
  return next();
  // }
  // res.redirect('/login');
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
        res.render('1.users/user_main', {data: data});
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

  app.get('/users/profile/:id', isLoggedIn, function(req, res) {
    UserModel.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        res.render('1.users/user_profile', {data: resul t});
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
      if (!err) {
        res.render('2.aulas/aula_main', {data: data});
      } else {
        console.log(err);
      }
    });
  });
  app.get('/aulas/new', isLoggedIn, function(req, res) {
    var ServiciosModel = require('../model/services_db');
    UserModel.findAll().where("role").equals("Profesor").exec(function (err, data_teacher) {
      if (!err) {
        UserModel.findAll().where("role").equals("Estudiante").exec(function (err, data_users) {
          if (!err) {
            data_users = data_users;
            ServiciosModel.findAll().where("type").equals("Curso").exec(function (err, cursos) {
              if (!err) {
                var EdicionesModel = require('../model/editions_db');
                EdicionesModel.findAll().exec(function (err, editions) {
                  console.log(err);
                  if (!err) {
                    res.render('2.aulas/aula_new', {users: data_users,profes:data_teacher, cursos: cursos, editions:editions});
                  } else {
                    console.log(err);
                  }
                });
              } else {
                console.log(err);
              }
            });
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    });
  });
  app.post('/aulas', isLoggedIn, function(req, res) {
    console.log(req.body);
    var Aulas = require('../model/aulas_db');
    if (Aulas.saveData(req.body)) {
      res.redirect('/aulas');
    } else {
      res.redirect('/aulas/new');
    }
  });

  var AulasModel = require('../model/aulas_db');
  app.get('/aulas/edit/:id', isLoggedIn, function(req, res) {
    AulasModel.findById(req.params.id).exec(function (err, data) {
      if (!err) {
        var ServiciosModel = require('../model/services_db');
        UserModel.findAll().where("role").equals("Profesor").exec(function (err, data_teachers) {
          if (!err) {
            UserModel.findAll().where("role").equals("Estudiante").exec(function (err, data_users) {
              if (!err) {
                data_users = data_users;
                ServiciosModel.findAll().where("type").equals("Curso").exec(function (err, cursos) {
                  if (!err) {
                    var EdicionesModel = require('../model/editions_db');
                    EdicionesModel.findAll().exec(function (err, editions) {
                      console.log(err);
                      if (!err) {
                        res.render('2.aulas/aula_edit', {data: data ,users: data_users, profes:data_teachers, cursos: cursos, editions:editions});
                      } else {
                        console.log(err);
                      }
                    });
                  } else {
                    console.log(err);
                  }
                });
              } else {
                console.log(err);
              }
            });
          } else {
            console.log("err");
          }
        });
      } else {
        console.log(err);
      }
    });
  });
  app.get('/aulas/sync', isLoggedIn, function(req, res) {
    res.redirect('/aulas');
  });
  app.get('/aulas/sync/:id', isLoggedIn, function(req, res) {
    AulasModel.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        let apiSql = require("../config/api_sql.js");
        apiSql.getUsersByAula(result.moodleId).then(function(rows){
          res.render("2.aulas/aula_sync", {data:result, external: rows});
        }).catch(function(err) {
          console.log(err);
        });
      } else {
        console.log("err");
      }
    });
  });
  app.put('/aulas/:id', isLoggedIn, function(req, res) {
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
  /*============================  2.aulas / notas ==============================*/
  app.get('/aulas/notas', isLoggedIn, function(req, res) {
    var NotasModel = require('../model/notas_db');
    NotasModel.findAll().exec(function (err, data) {
      if (!err) {
        res.render('2.1.notas/notas_main', {data: {}});
      } else {
        console.log(err);
      }
    });
  });
  app.get('/aulas/notas/new', isLoggedIn, function(req, res) {
    res.render('2.1.notas/notas_new', {});
  });
  /*============================  3.calendar ==============================*/
  app.get('/calendar', isLoggedIn, function(req, res) {
    var CalendarModel = require('../model/calendar_db');
    CalendarModel.findAll().exec(function (err, data) {
      console.log(err);
      if (!err) {
        res.render('3.calendar/calendar_main', {data: data});
      } else {
        console.log(err);
      }
    });
  });
  app.post('/calendar', isLoggedIn, function(req, res) {
    var Calendar = require('../model/calendar_db');
    if (Calendar.saveData(req.body)) {
      res.redirect('/calendar');
    } else {
      res.redirect('/calendar/new');
    }
  });
  app.get('/calendar/new', isLoggedIn, function(req, res) {
    var Editions = require('../model/editions_db');
    Editions.findAll().exec(function (err, editions) {
      if (!err) {
        res.render('3.calendar/calendar_new', {data: editions});
      } else {
        console.log(err);
      }
    });
  });
  app.get('/calendar/edit/:id', isLoggedIn, function(req, res) {
    var Calendar = require('../model/calendar_db');
    Calendar.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        var Editions = require('../model/editions_db');
        Editions.findAll().exec(function (err, editions) {
          if (!err) {
            res.render('3.calendar/calendar_edit', {data: result, data_editions: editions});
          } else {
            console.log(err);
          }
        });
      } else {
        console.log("err");
      }
    });
  });
  app.delete('/calendar/edit/:id', isLoggedIn, function(req, res) {
    var Calendar = require('../model/calendar_db');
    Calendar.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        Calendar.removeData(result).exec(function (err) {
          if (err) {
            console.log("!err");
            res.send(err.message);
          } else {
            res.redirect('/calendar');
          }
        });
      } else {
        console.log("err");
      }
    });
  });
  /*============================  4.logs ==============================*/
  app.get('/log', isLoggedIn, function(req, res) {
    var Log = require('../model/log_model');
    Log.findAll().exec(function (err, logs) {
      if (!err) {
        res.render('4.logs/log_main', {logs: logs});
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
    var CalendarModel = require('../model/calendar_db');
    CalendarModel.findAll().exec(function (err, cals) {
      if (!err) {
        var Config = require('../model/config_db');
        Config.findAll().exec(function (err, data) {
          console.log(err);
          if (!err) {
            res.render('5.settings/settings', {calendars: cals, data: data});
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    });
  });

  app.post('/config', isLoggedIn, function(req, res) {
    var Config = require('../model/config_db');
    if (Config.saveData(req.body)) {
      console.log("guardado");
    }
    res.redirect('/config');
  });

  /*============================  5.config servicios ==============================*/
  app.get('/config/servicios', isLoggedIn, function(req, res) {
    var ServiciosModel = require('../model/services_db');
    ServiciosModel.findAll().exec(function (err, data) {
      console.log(err);
      if (!err) {
        res.render('5.1.servicios/servicios_main', {data: data});
      } else {
        console.log(err);
      }
    });
  });

  app.get('/config/servicios/new', isLoggedIn, function(req, res) {
    res.render('5.1.servicios/servicios_new', {});
  });

  app.post('/config/servicios', isLoggedIn, function(req, res) {
    var Service = require('../model/services_db');
    if (Service.saveData(req.body)) {
      res.redirect('/config/servicios');
    } else {
      res.redirect('/config/servicios/new');
    }
  });

  app.get('/config/servicios/edit/:id', isLoggedIn, function(req, res) {
    var Service = require('../model/services_db');
    Service.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        res.render('5.1.servicios/servicios_edit', {data: result});
      } else {
        console.log("err");
      }
    });
  });

  app.delete('/config/servicios/edit/:id', isLoggedIn, function(req, res) {
    var Service = require('../model/services_db');
    Service.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        Service.removeData(result).exec(function (err) {
          if (err) {
            console.log("!err");
            res.send(err.message);
          } else {
            res.redirect('/config/servicios');
          }
        });
      } else {
        console.log("err");
      }
    });
  });

  app.put('/config/servicios/:id', isLoggedIn, function(req, res) {
    var Service = require('../model/services_db');
    Service.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        console.log("updating...");
        if (Service.updateData(req.body, req.params.id)) {
          res.redirect('/config/servicios');
        } else {
          res.redirect('/config/servicios/edit' + req.params.id);
        }
      } else {
        console.log("err");
      }
    });
  });
  /*============================  5.config ediciones ==============================*/
  app.get('/config/ediciones', isLoggedIn, function(req, res) {
    var EdicionesModel = require('../model/editions_db');
    EdicionesModel.findAll().exec(function (err, data) {
      console.log(err);
      if (!err) {
        res.render('5.2.ediciones/ediciones_main', {data: data});
      } else {
        console.log(err);
      }
    });
  });
  app.get('/config/ediciones/new', isLoggedIn, function(req, res) {
    var ServiciosModel = require('../model/services_db');
    ServiciosModel.findAll().exec(function (err, data) {
      console.log(err);
      if (!err) {
        res.render('5.2.ediciones/ediciones_new', {data:data});
      } else {
        console.log(err);
      }
    });
  });

  app.post('/config/ediciones', isLoggedIn, function(req, res) {
    var Ediciones = require('../model/editions_db');
    if (Ediciones.saveData(req.body)) {
      res.redirect('/config/ediciones');
    } else {
      res.redirect('/config/ediciones/new');
    }
  });

  app.get('/config/ediciones/edit/:id', isLoggedIn, function(req, res) {
    var Ediciones = require('../model/editions_db');
    Ediciones.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        var ServiciosModel = require('../model/services_db');
        ServiciosModel.findAll().exec(function (err, data) {
          console.log(err);
          if (!err) {
            res.render('5.2.ediciones/ediciones_edit', {data: result, data_services: data});
          } else {
            console.log(err);
          }
        });
      } else {
        console.log("err");
      }
    });
  });

  app.delete('/config/ediciones/edit/:id', isLoggedIn, function(req, res) {
    var Ediciones = require('../model/editions_db');
    Ediciones.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        Ediciones.removeData(result).exec(function (err) {
          if (err) {
            console.log("!err");
            res.send(err.message);
          } else {
            res.redirect('/config/ediciones');
          }
        });
      } else {
        console.log("err");
      }
    });
  });

  app.put('/config/ediciones/:id', isLoggedIn, function(req, res) {
    var Ediciones = require('../model/editions_db');
    Ediciones.findById(req.params.id).exec(function (err, result) {
      if (!err) {
        console.log("updating...");
        if (Ediciones.updateData(req.body, req.params.id)) {
          res.redirect('/config/ediciones');
        } else {
          res.redirect('/config/ediciones/edit' + req.params.id);
        }
      } else {
        console.log("err");
      }
    });
  });
};
