var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  console.log('first middleware call.');

  var userAgent = req.header('User-Agent');
  var paramId = req.body.id || req.query.id;

  
});

var server = http.createServer(app).listen(app.get('port'), function()
{
  console.log(app.get('port'));
});
