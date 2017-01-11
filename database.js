var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/log_pf', function () {
    console.log('mongodb connected');
});
module.exports = mongoose;