var db = require('../database');
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
      return bcrypt.compareSync(password, this.local.password);
    }
    return db.model('User', userSchema); 
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
      var currentDate = new Date();
      this.updated_at = currentDate;
      this.created_at = currentDate;
      next();
    });
    return db.model('Log', logSchema);
  }
}
