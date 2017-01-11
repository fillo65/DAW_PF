var models = require('./db_models');
var Log = models.Logs();
module.exports = {
    saveData: function (data) {
        var logData = new Log(data);
        var res = true;
        logData.save(function (err) {
            if (err) {
                console.log(err);
            }
        });
        return res;
    },
    findById: function (id) {
        return Log.findById({_id: id});
    },
    findAll: function () {
        return Log.find({});
    },
    updateData: function (reg, id) {
        var res = true;
        reg.updated_at = new Date();
        Log.findOneAndUpdate({"_id": id}, reg, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("success");
            }
        });
        return res;
    },
    removeData: function (result) {
        return Log.remove({"_id": result._id});
    }
}


//var userSchema = new Schema({
//    name: String,
//    username: {type: String, required: true, unique: true},
//    password: {type: String, required: true},
//    admin: Boolean,
//    location: String,
//    meta: {
//        age: Number,
//        website: String
//    },
//    created_at: Date,
//    updated_at: Date
//});
