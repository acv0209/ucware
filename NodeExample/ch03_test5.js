var person = {};

person.name = 'girls';
person['age'] = 20;

person.add = function(a, b) {
  return a + b;
}

console.log('add : ' + person.add(20, 20));
