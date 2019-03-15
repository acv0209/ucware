var http = require('http');
var fs = require('fs');

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
  // console.dir(req);
  var filename = 'icon.png';
  fs.readFile(filename, function(err, data) {
    res.writeHead(200, {"content-type":"image/png"});
    res.write(data);
    res.end();
  });

});
