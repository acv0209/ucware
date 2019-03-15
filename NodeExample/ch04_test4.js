var Calc = require('./calc3');

var calc1 = new Calc();
calc1.emit('stop');

console.log('finish calc stop event');
