var db = require('../database');
var bcrypt = require('bcrypt-nodejs');
module.exports = {
  User: function(){
    var userSchema = new db.Schema({
      name: String,
      email: {type: String, required: true, unique: true, lowercase: true},
      password: {type: String, required: true},
      role: String,
      courses: Array,
      meta: {
        dob: Number,
        website: String
      },
      created_at: Date,
      updated_at: Date
    });
    userSchema.methods.generateHash = function(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },
    userSchema.methods.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
    }
    let User;
    if (db.models && db.models.User){
      User = db.models.User;
    }else{
      User = db.model('User', userSchema);
    }
    return User;
  },
  Ediciones: function(){
    var EditionSchema = new db.Schema({
      yearC: Number,
      monthC: Number,
      Service: String,
      created_at: Date
    });

    EditionSchema.pre('save', function (next) {
      var currentDate = new Date().getTime();
      this.created_at = currentDate;
      next();
    });

    let Editions;
    if (db.models && db.models.Ediciones){
      Editions = db.models.Ediciones;
    }else{
      Editions = db.model('Ediciones', EditionSchema);
    }
    return  Editions;
  },
  Services: function(){
    var schema = new db.Schema({
      name: String,
      price: Number,
      type: String,
      prefix: String,
      modules: [db.Schema.ObjectId],
      created_at: Number
    });

    schema.pre('save', function (next) {
      var currentDate = new Date().getTime();
      this.created_at = currentDate;
      next();
    });

    let Service;
    if (db.models && db.models.Services){
      Service = db.models.Services;
    }else{
      Service = db.model('Services', schema);
    }
    return Service;
  },
  Aulas: function () {
    var serv = this.Services();
    var edi = this.Ediciones();
    var AulaSchema = new db.Schema({
      modules: [{ type: db.Schema.Types.ObjectId, ref:'Services' }],
      alumnes: [{ type: db.Schema.Types.ObjectId, ref:'User' }],
      edition: { type: db.Schema.Types.ObjectId, ref:'Ediciones' },
      notas: [db.Schema.ObjectId],
      number_vc: Number,
      created_at: Number,
      updated_at: Number
    });
    AulaSchema.pre('save', function (next) {
      var currentDate = new Date().getTime();
      this.updated_at = currentDate;
      this.created_at = currentDate;
      next();
    });
    AulaSchema.pre('update', function (next) {
      var currentDate = new Date().getTime();
      this.updated_at = currentDate;
      next();
    });
    return db.model('Aulas', AulaSchema);
  },
  Logs: function () {
    var logSchema = new db.Schema({
      title: {type: String, required: true, unique: true},
      description: String,
      url_file: String,
      created_at: Date,
      updated_at: Date
    });
    logSchema.pre('save', function (next) {
      var currentDate = new Date().getTime();
      this.updated_at = currentDate;
      this.created_at = currentDate;
      next();
    });
    return db.model('Log', logSchema);
  }
}
