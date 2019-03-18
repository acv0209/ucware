var express = require('express');
var http = require('http');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
  console.log('first middleware call.');

  req.user = 'mike';

  next();

  // res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
  // res.end('<h1>Server Response</h1>');
});

app.use(function(req, res, next) {
  console.log('second middleware call.');
  // res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
  // res.send('<h1>Server Response : ' + req.user + '</h1>');

  var person = {name:'generation', age:20};
  // res.send(person);

  var personStr = JSON.stringify(person);
  // res.send(personStr);

  res.writeHead(200, {"Content-Type":"application/json;charset=utf8"});
  res.write(personStr);
  res.end();
});

var server = http.createServer(app).listen(app.get('port'), function()
{
  console.log('express web server port : ' + app.get('port'));
});
