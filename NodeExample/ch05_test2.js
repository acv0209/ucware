var http = require('http');

var server = http.createServer();

var host = 'localhost';
var port = 3000;
server.listen(port, host, 50000, function(){
  console.log('web server execute');
});

server.on('connection', function(socket){
  console.log('client socket connection');
});

server.on('request', function(req, res) {
  console.log('client request');
  console.dir(req);

  res.writeHead(200, {"content-type":"text/html;charset=utf-8"});
  res.write('<h1>response from web page</h1>');
  res.end();
});
