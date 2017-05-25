var express = require('express')
        , http = require('http')
        , cookieParser = require('cookie-parser')
        , bodyParser = require('body-parser')
        , path = require('path')
        , flash    = require('connect-flash')
        , morgan   = require('morgan')
        , passport = require('passport')
        , session = require('express-session')
        , methodOverride = require('method-override')
        , engine = require('ejs-locals');

var app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
app.use(cookieParser());
// required for passport
app.use(session({ secret: 'cualquiercosa', cookie: { } })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
require('./routes/router')(app, passport);
require('./config/passport')(passport);


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
