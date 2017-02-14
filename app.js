
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , fs = require('fs')
  , http = require('http')
  , request = require('request')
  , compress = require('compression')
  , jsdom = require('jsdom')
  , path = require('path')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , logger = require('morgan')
  , papaParse = require('papaparse')
  , methodOverride = require('method-override');

//On intègre le ftp au lancement de l'application
//require('./ftp');

var app = express();

var oneDay = 86400000;

//Methode pour recuperer un fichier JS depuis son URL complete et
// modifie les eventuels champs url: pour pointer sur la bonne url
var getJs = function(script){
  var fileName = script.replace("javascript/", "");
  request.get("https://www.apex-timing.com/gokarts/"+script, function(error, response, body){
    if(~fileName.indexOf("?")){
      fileName = fileName.substr(0, fileName.indexOf("?"));
    }
    fileName = "public/scripts/apex/"+ fileName;
    body = body.replace("url: \"", "url: \"https://www.apex-timing.com/gokarts/");
    fs.writeFile(fileName, body, function(err){
      if(err){
        console.log(err);
      }
    });
  })
};



app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(compress());
app.use(require('stylus').middleware(__dirname + '/public'));
app.use('/toad', express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

if (app.get('env') == 'development') {
	app.locals.pretty = true;
}

app.get('/toad', routes.index);

app.get('/resultatsApex', function(req, res){
  var urlSaisie = req.query;
  if(typeof urlSaisie.start != 'undefined'){
    console.log("Param start présent !");
    console.log("Start : "+urlSaisie.start);
    var start = "&start="+urlSaisie.start;
  } else {
    console.log("Param start non présent...");
    var start = "";
  }
  if(typeof urlSaisie.count != 'undefined'){
    console.log("Param count présent !");
    console.log("count : "+urlSaisie.count);
    var count = "&count="+urlSaisie.count;
  } else {
    console.log("Param count non présent...");
    var count = "";
  }
  request.get("https://www.apex-timing.com/gokarts/results.php?center=54&leaderboard=7"+start+count, function(error, response, body){
    jsdom.env(
      body,
      function(err, window){
        global.window = window;
        global.document = window.document;
        var scripts = document.querySelectorAll('script');
        for(var i = 0; i < scripts.length; i++){
          var script = scripts[i].src;
          if(script !== ""){
            var url = "https://www.apex-timing.com/gokarts/" + script;
            //Appel fonction pour recuperer script js unitairement
            getJs(script);
          }
        }
      }
    );
    // Modification des src javascript pour pointer sur les sources locales
    var regExpJs = new RegExp("src=\"javascript", "g");
    body = body.replace(regExpJs, "src=\"toad/scripts/apex");
    // Modification des src media/images/href
    var regExpMedia = new RegExp("src=\"media", "g");
    body = body.replace(regExpMedia, "src=\"https://www.apex-timing.com/gokarts/media");
    var regExpImages = new RegExp("src=\"images", "g");
    body = body.replace(regExpImages, "src=\"https://www.apex-timing.com/gokarts/images");
    var regExpHref = new RegExp("link href=\"", "g");
    body = body.replace(regExpHref, "link href=\"https://www.apex-timing.com/gokarts/");

    body = body.replace('</body>', '<script type="text/javascript" src="toad/scripts/inputApex.js" ></script></body>');

    // Ecriture du ody récupéré (pas vraiment utile pour le moment...)
    fs.writeFile("body.html", body, "utf-8", function(err){
      if(err){
        return console.log(err);
      }
    });
    //console.log(body);
    res.end(body);
  })
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
