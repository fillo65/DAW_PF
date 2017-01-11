var express = require('express')
        , http = require('http')
        , bodyParser = require('body-parser')
        , path = require('path');

//var Schema = mongoose.Schema;
//var ObjectId = Schema.ObjectId;

//var Tarea = new Schema({
//    fecha: Date,
//    tarea: String,
//});

//var Tarea = mongoose.model('Tarea', Tarea);


var app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.use(methodOverride()
//app.use(erroHandler());
app.use(express.static(path.join(__dirname, 'public')));
////enrutar
app.use(require('./routes/router'));

//routes.get('/', routes.index);
//routes.get('/tareas', function (req, res) {
//    Tarea.find({}, function (err, docs) {
//        res.render('tareas/index', {
//            title: 'Vista index lista de tareas',
//            docs: docs
//        });
//    });
//});
//routes.get('/tareas/nueva', function (req, res) {
//    res.render('tareas/nueva.jade', {
//        title: 'Nueva Tarea'
//    });
//});
//
//routes.post('/tareas', function (req, res) {
//    var tarea = new Tarea(req.body.tarea);
//    tarea.save(function (err) {
//        if (!err) {
//            res.redirect('/tareas');
//        } else {
//            res.redirect('/tareas/nueva');
//        }
//    });
//});

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});