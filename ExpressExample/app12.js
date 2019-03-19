var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');


var app = express();

app.set('port', process.env.PORT || 3000);
app.use(static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
  secret:'my key',
  resave:true,
  saveUninitialized:true
}));

var router = express.Router();

router.route('/process/product').get(function(req, res) {
  console.log('/process/product routing function call');

  if (req.session.user) {
    res.redirect('/public/product.html');
  } else {
    res.redirect('/public/login2.html');
  }
});

router.route('/process/login').post(function(req, res) {
  console.log('/process/login function call');

  var paramId =  req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;
  console.log(paramId + ', ' + paramPassword);

  if(req.session.user) {
    console.log('already login');
    res.redirect('/public/product.html')
  } {
    req.session.user = {
      id:paramId,
      name:'generation',
      authorized:true
    };
    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.write('<h1>login success</h1>');
    res.write('<p> Id : ' + paramId + '</p>');
    res.write('<br><br><a href= "/public/product.html"> 상품 페이지 이동 </a>');
  }

});

router.route('/process/setUserCookie').get(function(req, res) {
  console.log('/process/setUserCookie Routing Fucntion call');

  res.cookie('user', {
    id:'mike',
    name:'generation',
    authorized:true
  });

  res.redirect('/process/showCookie');
});

router.route('/process/showCookie').get(function(req, res) {
  console.log('/process/showCookie Route function call.');

  res.send(req.cookies);
});

router.route('/process/login').post(function(req, res) {
  console.log('/process/login routing function');

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
  res.write("<h1>response from server</h1>");
  res.write("<div><p>" + paramId + "</p></div>");
  res.write("<div><p>" + paramPassword + "</p></div>");
  res.end();
});

app.use('/', router);

app.all('*', function(req, res) {
  res.status(404).send('<h1>This is 404 </h1>')
});

app.use(function(res, req, next) {
  console.log('first middleware call.');

  var userAgent = req.header('User-Agent');
  var paramId = req.body.id || req.query.id;

  res.send('<h3>userAgent : ' + userAgent + '/h3><h3>paramId : ' + paramId + "</h3>");
});

var server = http.createServer(app).listen(app.get('port'), function()
{
  console.log(app.get('port'));
});
