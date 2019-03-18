var express = require('express');
var http = require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
  console.log('first middleware call.');

  res.redirect('http://google.co.kr');
});

var server = http.createServer(app).listen(app.get('port'), function()
{
  console.log(app.get('port'));
});
