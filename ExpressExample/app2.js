var express = require('express');
var http = require('http');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
  console.log('first middleware call.');

  res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
  res.end('<h1>server response</h1>');
});


var server = http.createServer(app).listen(app.get('port'), function()
{
  console.log('express web server port : ' + app.get('port'));
});
