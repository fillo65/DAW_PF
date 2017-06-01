var models = require('./db_models');
var Results = models.Results();
module.exports = {
  saveData: function (data) {
    var resultsData = new Notas(data);
    var res = true;
    resultsData.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    return res;
  },
  findById: function (id) {
    return Results.findById({_id: id});
  },
  findByAulaNota: function (idaula, idnota) {
    return Results.find({aula: idaula, nota: idnota});
  },
  findAll: function () {
    let aulas = Results.find({}).populate('modules alumnes edition profes') ;
    return aulas;
  },
  updateData: function (reg, id) {
    var res = true;
    reg.updated_at = new Date();
    Results.findOneAndUpdate({"_id": id}, reg, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    });
    return res;
  },
  removeData: function (result) {
    return Results.remove({"_id": result._id});
  }
}
