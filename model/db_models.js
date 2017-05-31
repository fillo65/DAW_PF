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
  Notas: function(){
    var NotasSchema = new db.Schema({
      aula: { type: db.Schema.Types.ObjectId, ref:'Aulas' },
      name: String,
      comment: String,
      created_at: Date,
      updated_at: Date
    });

    NotasSchema.pre('save', function (next) {
      var currentDate = new Date();
      this.created_at = currentDate;
      next();
    });
    NotasSchema.pre('update', function (next) {
      var currentDate = new Date();
      this.updated_at = currentDate;
      next();
    });
    let Notas;
    if (db.models && db.models.Notas){
      Notas = db.models.Notas;
    }else{
      Notas = db.model('Notas', NotasSchema);
    }
    return  Notas;
  },
  Results: function(){
    var ResultsSchema = new db.Schema({
      nota: { type: db.Schema.Types.ObjectId, ref:'Notas' },
      alumnes: { type: db.Schema.Types.ObjectId, ref:'User' },
      aula: { type: db.Schema.Types.ObjectId, ref:'Aulas' },
      resultado: String,
      comment: String,
      created_at: Date,
      updated_at: Date
    });

    ResultsSchema.pre('save', function (next) {
      var currentDate = new Date();
      this.created_at = currentDate;
      next();
    });
    ResultsSchema.pre('update', function (next) {
      var currentDate = new Date();
      this.updated_at = currentDate;
      next();
    });
    let Results;
    if (db.models && db.models.Results){
      Results = db.models.Results;
    }else{
      Results = db.model('Results', ResultsSchema);
    }
    return  Results;
  },
  Ediciones: function(){
    var EditionSchema = new db.Schema({
      yearC: Number,
      monthC: Number,
      Service: { type: db.Schema.Types.ObjectId, ref:'Services' },
      created_at: Date,
      updated_at: Date
    });

    EditionSchema.pre('save', function (next) {
      var currentDate = new Date();
      this.created_at = currentDate;
      next();
    });
    EditionSchema.pre('update', function (next) {
      var currentDate = new Date();
      this.updated_at = currentDate;
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
  Config: function(){
    var ConfigSchema = new db.Schema({
      num_aulas: Number,
      num_users: Number,
      calendar: { type: db.Schema.Types.ObjectId, ref:'Calendar' },
      created_at: Date,
      updated_at: Date
    });

    ConfigSchema.pre('save', function (next) {
      var currentDate = new Date().getTime();
      this.created_at = currentDate;
      next();
    });
    ConfigSchema.pre('update', function (next) {
      var currentDate = new Date().getTime();
      this.updated_at = currentDate;
      next();
    });
    let config;
    if (db.models && db.models.Config){
      config = db.models.Config;
    }else{
      config = db.model('Config', ConfigSchema);
    }
    return  config;
  },
  Calendar: function(){
    var CalendarSchema = new db.Schema({
      name: String,
      editions: [{ type: db.Schema.Types.ObjectId, ref:'Ediciones' }],
      created_at: Date,
      updated_at: Date
    });

    CalendarSchema.pre('save', function (next) {
      var currentDate = new Date().getTime();
      this.created_at = currentDate;
      this.updated_at = currentDate;
      next();
    });
    CalendarSchema.pre('update', function (next) {
      var currentDate = new Date().getTime();
      this.updated_at = currentDate;
      next();
    });
    let config;
    if (db.models && db.models.Calendar){
      config = db.models.Calendar;
    }else{
      config = db.model('Calendar', CalendarSchema);
    }
    return  config;
  },
  Services: function(){
    var schema = new db.Schema({
      name: String,
      price: Number,
      type: String,
      prefix: String,
      modules: [db.Schema.ObjectId],
      created_at: Date,
      updated_at: Date
    });

    schema.pre('save', function (next) {
      var currentDate = new Date().getTime();
      this.created_at = currentDate;
      next();
    });
    schema.pre('update', function (next) {
      var currentDate = new Date().getTime();
      this.updated_at = currentDate;
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
      _id:    {type:db.Schema.ObjectId, unique:true, index: true, required: true, auto: true },
      modules: { type: db.Schema.Types.ObjectId, ref:'Services' },
      profes: { type: db.Schema.Types.ObjectId, ref:'User' },
      alumnes: [{ type: db.Schema.Types.ObjectId, ref:'User' }],
      edition: { type: db.Schema.Types.ObjectId, ref:'Ediciones' },
      notas: [db.Schema.ObjectId],
      number_vc: Number,
      moodleId: Number,
      created_at: Date,
      updated_at: Date
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
    AulaSchema.index({modules: 1, edition: 1},{name: "aulas_id"});
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
