var calc2 = require('./calc2');

console.log('after module division : ' + calc2.add(30, 30));

var nconf  = require('nconf');
nconf.env().argv();

var os = nconf.get('OS');

console.log('OS conf : ' + os);
