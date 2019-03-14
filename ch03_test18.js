function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.walk = function(speed) {
  console.log(speed + 'km 속도로 걸어갑니다.');
}

var person3 = new Person('generation', 20);
var person4 = new Person('girlsday', 20);

person3.walk(10);
