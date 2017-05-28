var models = require('./db_models');
let ediciones = models.Ediciones();
module.exports = {
  saveData: function (data) {
    var editionsData = new ediciones(data);
    var res = true;
    editionsData.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    return res;
    },
    findById: function (id) {
      return ediciones.findById({_id: id});
    },
    findAll: function () {
    return ediciones.find({});
    },
    updateData: function (reg, id) {
      var res = true;
      reg.updated_at = new Date();
      ediciones.findOneAndUpdate({"_id": id}, reg, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      });
      return res;
    },
    removeData: function (result) {
      return ediciones.remove({"_id": result._id});
    }
  }
