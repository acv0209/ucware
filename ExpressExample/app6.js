var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
  console.log('first middleware call.');

  var userAgent = req.header('User-Agent');
  var paramName = req.query.name;

  res.send('<h3>response from server userAgent -> ' + userAgent + '</h3><h3>response from server paramName -> ' + paramName + '</h3>');

});

var server = http.createServer(app).listen(app.get('port'), function()
{
  console.log(app.get('port'));
});
