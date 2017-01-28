
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , fs = require('fs')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , papaParse = require('papaparse')
  , methodOverride = require('method-override');

//On intègre le ftp au lancement de l'application
require('./ftp');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') == 'development') {
	app.locals.pretty = true;
}

app.get('/toad', routes.index);

//Section pour lire un fichier csv et retourner un tableau d objet json
//Ce n'est qu'un proto pour l'instant
//Ca va etre adapté soon pour correspondre à l'article B du fichier csv passé par APEX
app.get('/getJsonData', function(req, res) {
  var jsonTab = [];
  fs.readFile(__dirname + '/apex/test.csv', 'utf8', function(err, data){
    var jsonData = papaParse.parse(data, {dynamicTyping: true, skipEmptyLines: true, delimiter: ";" }).data;
    var jsonObject = function(firstName, lastName){
      this.firstName = firstName;
      this.lastName = lastName;
    }
    console.log('jsonData : '+jsonData);
    for (data of jsonData) {

      jsonTab.push(new jsonObject(data[0], data[1]));
    };
    res.end(JSON.stringify(jsonTab));
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
