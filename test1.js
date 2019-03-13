console.log('hello.');
console.log('number : %d', 10);

console.log('string : %s', 'letters');


var person = {
  name : 'girl\'generation',
  age : 20
};
console.log('java script object : %j', person);

console.dir(person);

console.time('duration_time');

var result = 0;
for (var i = 0; i < 10000; i++) {
  result += i;
}

console.timeEnd('duration_time');

console.log('file_name : ', __filename);
console.log('file_path : ', __dirname);
