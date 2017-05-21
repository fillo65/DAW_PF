var Log = require('../model/log_model');
var general = require("../general_settings");

exports.new = function (req, res) {
    res.render('log_new', {});
};
exports.log_list = function (req, res) {
    Log.findAll().exec(function (err, logs) {
        if (!err) {
            res.render('log', {logs: logs});
        } else {
            console.log(err)
        }
    });
};
exports.log_save = function (req, res) {
    console.log(req.body);
    if (Log.saveData(req.body)) {
        res.redirect('/log');
    } else {
        res.redirect('/log/new');
    }
};
exports.delete = function (req, res) {
    Log.findById(req.params.id).exec(function (err, result) {
        if (!err) {
            Log.removeData(result).exec(function (err) {
                if (err) {
                    console.log("!err");
                    res.send(err.message);
                } else {
                    res.redirect('/log');
                }
            });
        } else {
            console.log("err");
        }
    });
};
exports.findById = function (req, res) {
    Log.findById(req.params.id).exec(function (err, result) {
        if (!err) {
            res.render('log_edit', {log: result, title: general["logs"]["name"]});
        } else {
            console.log("err");
        }
    });
};
exports.edit = function (req, res) {
    Log.findById(req.params.id).exec(function (err, result) {
        if (!err) {
            console.log("updating...");
            if (Log.updateData(req.body, req.params.id)) {
                res.redirect('/log');
            } else {
                res.redirect('/log/edit' + req.params.id);
            }
        } else {
            console.log("err");
        }
    });
};
