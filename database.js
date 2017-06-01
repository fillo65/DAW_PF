var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/log_pf', function () {
    console.log('mongodb connected');
});

module.exports = mongoose;
