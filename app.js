
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

var getJs = function(script){
  var fileName = script.replace("javascript/", "");
  request.get("https://www.apex-timing.com/gokarts/"+script, function(error, response, body){
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
  request.get("https://www.apex-timing.com/gokarts/results.php?center=54&leaderboard=7", function(error, response, body){

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
            getJs(script);
            //Appel fonction pour recuperer script js unitairement
            console.log(script);
          }
        }
      }
    );
    var regExpSrc = new RegExp("src=\"", "g");
    body = body.replace(regExpSrc, "src=\"https://www.apex-timing.com/gokarts/");
    var regExpMedia = new RegExp("link href=\"", "g");
    body = body.replace(regExpMedia, "link href=\"https://www.apex-timing.com/gokarts/");
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
