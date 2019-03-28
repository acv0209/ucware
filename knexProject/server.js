var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8001;
var knex = require('./db/knex');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/todos', function(req, res) {
  knex.select().from('todos').where('id', 1)
  .then(function(todo) {
    res.send(todo)
  })
  // knex.raw('select * from todos where id = 1').then(function(todo) {
  //   res.send(todo)
  // })
  // knex.select().from('todos').then(function(todos) {
  //   res.send(todos)
  // })
  // knex.raw('select * from todos').then(function(todos) {
  //   res.send(todos)
  // });
});

app.post('/todos', function(req, res) {
  knex('todos').insert({
    title: "go play some shortcut sports ...whatever that means",
    user_id: 1
  })
  .then(function() {
    knex.select().from('todos').where('user_id', 1)
    .then(function(todo) {
      res.send(todo)
    })
  })

  // knex.raw('insert into todos(title, user_id) values(?, ?)', ['go play some sports', '1'])
  // .then(function() {
  //   knex.select().from('todos').where('id', 1)
  //   .then(function(todo) {
  //     res.send(todo)
  //   })
  // })
});

app.listen(port, function() {
  console.log("listening on port: ", port);
});
