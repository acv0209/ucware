function add(a, b, callback) {
  var result = a + b;
  callback(result);

  var count = 0;
  var history = function() {
    count += 1;
    return count + " : " + a + ' + ' + b + ' = ' + result;
  };

  return history;
}

var add_history = add(20, 20, function(result) {
  console.log('result : ' + result);
});

console.log('add_history data type : ' + typeof(add_history));

console.log('add_history function : ' + add_history());
console.log('add_history function : ' + add_history());
console.log('add_history function : ' + add_history());
