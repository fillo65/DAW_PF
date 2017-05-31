var models = require('./db_models');
var Notas = models.Notas();
module.exports = {
  saveData: function (data) {
    var notasData = new Notas(data);
    var res = true;
    notasData.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    return res;
  },
  findById: function (id) {
    let aulas = Notas.findById({_id: id});
    return aulas;
  },
  findAll: function () {
    let aulas = Notas.find({});
    return aulas;
  },
  updateData: function (reg, id) {
    var res = true;
    reg.updated_at = new Date();
    Notas.findOneAndUpdate({"_id": id}, reg, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    });
    return res;
  },
  removeData: function (result) {
    return Notas.remove({"_id": result._id});
  }
}
