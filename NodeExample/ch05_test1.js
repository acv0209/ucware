var http = require('http');

var server = http.createServer();

// server.listen();
var host = 'localhost';
var port = 3000;
var max = 50000;
server.listen(port, host, max, function() {
  console.log('web server execute : ' + host + ":" + port);
});
