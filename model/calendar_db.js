var models = require('./db_models');
let Calendar = models.Calendar();
let editions = models.Ediciones();
module.exports = {
  saveData: function (data) {
    var CalendarData = new Calendar(data);
    var res = true;
    CalendarData.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    return res;
    },
    findById: function (id) {
      return Calendar.findById({_id: id}).populate("editions");
    },
    findAll: function () {
    return Calendar.find({}).populate("editions");
    },
    updateData: function (reg, id) {
      var res = true;
      reg.updated_at = new Date();
      Calendar.findOneAndUpdate({"_id": id}, reg, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("success");
        }
      });
      return res;
    },
    removeData: function (result) {
      return Calendar.remove({"_id": result._id});
    }
  }
