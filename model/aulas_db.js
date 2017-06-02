var models = require('./db_models');
var db = require('../database');
var deepPopulate = require('mongoose-deep-populate')(db);
var Aulas = models.Aulas();
var ediciones = models.Ediciones();
module.exports = {
  saveData: function (data) {
    var aulasData = new Aulas(data);
    var res = true;
    aulasData.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    return res;
  },
  findById: function (id) {
    let aulas = Aulas.findById({_id: id}).deepPopulate('modules alumnes edition edition.Service profes');
    return aulas;
  },
  findAll: function () {
    let aulas = Aulas.find({}).deepPopulate('modules alumnes edition edition.Service profes');
    return aulas;
  },
  findFive: function () {
    let aulas = Aulas.find({}).deepPopulate('modules alumnes edition edition.Service profes').sort({'created_at': -1}).limit(5);
    return aulas;
  },
  updateData: function (reg, id) {
    var res = true;
    reg.updated_at = new Date();
    Aulas.findOneAndUpdate({"_id": id}, reg, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    });
    return res;
  },
  removeData: function (result) {
    return Aulas.remove({"_id": result._id});
  }
}
