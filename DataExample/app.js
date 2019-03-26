var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var expressErrorHandler = require('express-error-handler');

var mongoClient = require('mongodb').MongoClient;

var database;

function connectDB() {
  var databaseUrl = 'mongodb://localhost:27017/local';

  mongoClient.connect(databaseUrl, function(err, db) {
    if (err) {
      console.log('database connection error');
      return;
    }

    console.log('database connected...' + databaseUrl);
    database = db;
  });
}

// var multer = require('multer');
// var fs = require('fs');
//
// var cors = require('cors');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use('/public', static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
  secret:'my key',
  resave: true,
  saveUninitialized:true
}));



var router = express.Router();

app.use('/', router);



// app.all('*', function(req, res) {
//     res.status(404).send('<h1>This is 404 page</h1>');
// });

var errorHandler = expressErrorHandler({
  static: {
    '404': './public/404.html'
  }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);


var server = http.createServer(app).listen(app.get('port'), function()
{
  console.log('Express Execute : ' + app.get('port'));

  connectDB();
});




















//
