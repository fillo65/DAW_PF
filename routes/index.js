var general = require("../general_settings");

exports.index = function(req, res){
  res.render('index', {title: general["index"]["name"]});
};
