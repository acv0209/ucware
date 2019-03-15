var users = [{name:'generaton', age:20}, {name:'girlsday', age:22}];

var oper = function(a, b) {
  return a + b;
}
users.push(oper);

console.dir(users);
console.log('third : ' + users[2](10, 10));
