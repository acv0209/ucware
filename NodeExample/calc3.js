var eventEmitter = require('events').EventEmitter;
var util = require('util');

var calc = function() {
  this.on('stop', function() {
    console.log('calc stop event delivery');
  });
};

util.inherits(calc, eventEmitter);

calc.prototype.add = function(a, b) {
  return a + b;
}

module.exports = calc;
