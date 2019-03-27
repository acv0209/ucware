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
  var databaseUrl = 'mongodb://localhost:27017';

  mongoClient.connect(databaseUrl, function(err, client) {
    if (err) {
      console.log('database connection error');
      return;
    }
    console.log('database connected...' + databaseUrl);
    var db = client.db('local');
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

router.route('/process/login').post(function(req, res) {
  console.log('/process/login routing fucntion call');

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;
  console.log('request parameter : ' + paramId + ', ' + paramPassword);

  if (database) {
    authUser(database, paramId, paramPassword, function(err, docs)
    {
      if (err) {
        console.log('error occured');
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>error occured</h1>');
        res.end();
        return;
      }

      if (docs) {
        console.dir(docs);
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>user login success</h1>');
        res.write('<div><p>user : ' + docs[0].name + '</p></div>');
        res.write('<br><br><a href="/public/login.html">login again</a>');
        res.end();
        // return;
      } else {
        // console.dir(database);
        // console.dir(docs);
        console.log('error occured');
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>There\'s no Data</h1>');
        res.end();
        // return;
      }
    });
  } else {
    console.log('error occured');
    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.write('<h1>No Connection</h1>');
    res.end();
  }

});

app.use('/', router);

var authUser = function(db, id, password, callback) {
  console.log('auth user call : ' + id + ', ' + password);

  var users = db.collection('users');
  // console.log(typeof(users));
  // console.log(typeof(id));
  // console.log(typeof(password));
  // console.dir(users);
  // console.dir(id.toString());
  // console.dir(String(password));

  // var test = users.findOne({"id":id, "password":password});
  // console.dir(test);
  // test.getData().then(function(){
  //   console.log('success');
  // }).catch(function(err) {
  //   console.log(err);
  // });

  users.find({}).toArray(function(err, docs) {
    if (err) {
      callback(err, null);
      return;
    }
    if (docs.length > 0) {
      console.log('find user');
      callback(null, docs);
    } else {
      // console.dir(docs);
      console.log('can not find user');
      callback(null, null);
    }
  });

};

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
