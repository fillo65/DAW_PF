var models = require('./db_models');
var Config = models.Config();
module.exports = {
  saveData: function (data) {
    var configData = new Config(data);
    var res = true;
    configData.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    return res;
  },
  findById: function (id) {
    let aulas = Config.findById({_id: id}).populate('calendar') ;
    return aulas;
  },
  findAll: function () {
    let aulas = Config.find({}).populate('calendar') ;
    return aulas;
  },
  updateData: function (reg, id) {
    var res = true;
    reg.updated_at = new Date();
    Config.findOneAndUpdate({"_id": id}, reg, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    });
    return res;
  },
  removeData: function (result) {
    return Config.remove({"_id": result._id});
  }
}
