var express = require('express')
        , http = require('http')
        , cookieParser = require('cookie-parser')
        , bodyParser = require('body-parser')
        , path = require('path')
        , flash    = require('connect-flash')
        , morgan   = require('morgan')
        , passport = require('passport')
        , session = require('express-session');

var app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(cookieParser());
app.use(session({ secret: 'cualquiercosa', cookie: { } })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./routes/router')(app, passport);
require('./config/passport')(passport);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
