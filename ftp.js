var ftpd = require('./node_modules/ftpd/lib/ftpd.js');
var fs = require('fs');
var path = require('path');
var keyFile;
var certFile;
var server;
var options = {
  host: process.env.IP || '127.0.0.1',
  port: process.env.PORT || 7002,
  tls: null,
};

//Initialisation du server
//Par défaut le root sera dans ./apex pour ne pas permettre au user de se balader dans les sources de l'appli
server = new ftpd.FtpServer(options.host, {
  getInitialCwd: function() {
    return '/';
  },
  getRoot: function() {
    return process.cwd() + '/apex/';
  },
  pasvPortRangeStart: 1025,
  pasvPortRangeEnd: 1050,
  tlsOptions: options.tls,
  allowUnauthorizedTls: false,
  useWriteFile: true,
  useReadFile: false,
  uploadMaxSlurpSize: 10000, // N/A unless 'useWriteFile' is true.
});

server.on('error', function(error) {
  console.log('FTP Server error:', error);
});

server.on('client:connected', function(connection) {
  var username = null;
  console.log('client connected: ' + connection.remoteAddress);
  connection.on('command:user', function(user, success, failure) {
    //Pour le moment seul APEX est autorisé
    if (user === 'APEX') {
      username = user;
      success();
    } else {
      failure();
    }
  });

  // Pour le moment le mot de passe est APEX
  connection.on('command:pass', function(pass, success, failure) {
    if (pass === 'APEX') {
      success(username);
    } else {
      failure();
    }
  });
});

server.debugging = 4;
server.listen(options.port);
console.log('Listening on port ' + options.port);
