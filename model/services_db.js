var models = require('./db_models');
let services = models.Services();
module.exports = {
  saveData: function (data) {
    var serviceData = new services(data);
    var res = true;
    serviceData.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    return res;
  },
  findById: function (id) {
    return services.findById({_id: id});
  },
  findInArray: function (arr) {
    return services.find({_id: { $in:  [arr]  }});
  },
  findAll: function () {
    return services.find({});
  },
  findAllnin: function (arr) {
    return services.find({modules: {$nin:{arr}}});
  },
  updateData: function (reg, id) {
    var res = true;
    reg.updated_at = new Date();
    services.findOneAndUpdate({"_id": id}, reg, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    });
    return res;
  },
  removeData: function (result) {
    return services.remove({"_id": result._id});
  }
}
