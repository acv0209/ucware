var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var expressErrorHandler = require('express-error-handler');

var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit:10,
    host:'',
    user:'',
    password:'',
    database:'test_db',
    debug:false
});



// var multer = require('multer');
// var fs = require('fs');
//e('cors');

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
  console.log('/process/login routing function call');

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;
  console.log('request paramId : ' + paramId);
  console.log('request paramPassword : ' + paramPassword);

  authUser(paramId, paramPassword, function(err, rows) {
    if (err) {
      console.log('error occured');
      res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
      res.write('<h1>Error occured</h1>');
      return;
    }

    if (rows) {
      console.dir(rows);
      res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
      res.write('<h1>user login success</h1>');
      res.write('<div><p>user : ' + rows[0].name + '</p></div>');
      res.end();
    } else {
      console.log('error occured');
      res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
      res.write('<h1>No data</h1>');
    }
  });
});

router.route('/process/adduser').post(function(req, res) {
    console.log('/process/adduser routing function call');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramAge = req.body.age || req.query.age;

    console.log('request praramId : ' + paramId);
    console.log('request paramPassword : ' + paramPassword);
    console.log('request paramName : ' + paramName);
    console.log('request paramAge : ' + paramAge);

    var age = Number(paramAge);
    addUser(paramId, paramName, age, paramPassword, function(err, addedUser) {
      if (err) {
        console.log('error occured');
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>error occured</h1>');
        res.end();
        return;
      }

      if (addUser) {
        console.dir(addUser);

        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>user add success</h1>');
        res.end();
      } else {
        console.log('error occured');
        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write('<h1>add user fail</h1>');
        res.end();

      }
    });
});

app.use('/', router);

var addUser = function(id, name, age, password, callback) {
  console.log('addUser Call');

  pool.getConnection(function(err, conn) {
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    console.log('database connection thread id : ' + conn.threadId);

    var data = {id:id, name:name, age:age, password:password};
    var exec = conn.query('insert into users set ?', data,
    function(err, result) {
      conn.release();
      console.log('sql : ' + exec.sql);

      if (err) {
        console.log('sql error');
        callback(err, null);
      }

      callback(null, result);
    });
  });
}

var authUser = function(id, password, callback) {
  console.log('authUser call : ' + id + ', ' + password);
  pool.getConnection(function(err, conn) {
    if (err) {
      if (conn) {
        conn.release();
      }
      callback(err, null);
      return;
    }
    console.log('database connection thread id : ' + conn.threadId);

    var tablename = 'users';
    var columns = ['id', 'name', 'age'];
    var exec = conn.query("select ?? from ?? where id = ? and password = ?", [columns, tablename, id, password],
    function(err, rows) {
      conn.release();
      console.log('SQL : ' + exec.sql);

      if (err) {
        callback(err, null);
        return;
      }

      if (rows.length > 0) {
        console.log('find user');
        callback(null, rows);
      } else {
        console.log('can not find user');
        callback(null, null);
      }
    });

  });
}

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

  // connectDB();
});




















//
