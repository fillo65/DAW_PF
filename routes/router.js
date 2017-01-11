var express = require('express')
        , methodOverride = require('method-override');

var router = express.Router();
var file_index = require("./index");
var file_log_list = require("./log_list");

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
//Lista de todas las frutas rutas
//

//Raiz
router.get('/', file_index.index);
router.get('/home', file_index.index);

//pagina de lista de logs
router.get('/log', file_log_list.log_list);
//Create log
router.post('/log', file_log_list.log_save);

//pagina de creacion nuevo
router.get('/log/new', file_log_list.new);

//pagina de edicion nuevo
router.get('/log/edit/:id', file_log_list.findById);
//Delete Log
router.delete('/log/edit/:id', file_log_list.delete);
//Update Log
router.put('/log/:id', file_log_list.edit);


//exportar la funcion para que la use app
module.exports = router;
