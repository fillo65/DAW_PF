var db = require('../database');
module.exports = {
    Logs: function () {
        var logSchema = new db.Schema({
            title: {type: String, required: true, unique: true},
            description: String,
            url_file: String,
            created_at: Date,
            updated_at: Date
        });
        logSchema.pre('save', function (next) {
            var currentDate = new Date();
            this.updated_at = currentDate;
            this.created_at = currentDate;
            next();
        });
        return db.model('Log', logSchema);
    }
}