var models = require('./db_models');
var User = models.User();
module.exports = {
  saveData: function (data) {
    var userData = new User(data);
    var res = true;
    userData.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    return res;
  },
  findById:{},
  findAll:{},
  updateData:{},
  removeData:{}

}
