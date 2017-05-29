var models = require('./db_models');
var Aulas = models.Aulas();
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
    return Aulas.findById({_id: id});
  },
  findAll: function () {
    let aulas = Aulas.find({}).populate('modules alumnes edition') ;
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
