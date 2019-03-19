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

var router = express.Router();

router.route('/process/login/:name').post(function(req, res) {
  console.log('receive /process/login:name routing function');

  var paramName = req.params.name;

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
  res.write("<h1>response from server</h1>");
  res.write("<div><p>" + paramName + "</p></div>");
  res.write("<div><p>" + paramId + "</p></div>");
  res.write("<div><p>" + paramPassword + "</p></div>");
  res.end();
});

app.use('/', router);

app.use(function(res, req, next) {
  console.log('first middleware call.');

  var userAgent = req.header('User-Agent');
  var paramId = req.body.id  || req.query.id;

  res.send('<h3>response from server userAgent -> ' + userAgent + '</h3><h3>response from server paramId -> ' + paramId + '</h3>');

});

var server = http.createServer(app).listen(app.get('port'), function()
{
  console.log(app.get('port'));
});
