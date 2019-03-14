var users = [
  {name:'generation', age:20},
  {name:'girlsday', age:22},
  {name:'tara', age:21}
];

delete users[1];
console.dir(users);

users.forEach(function(elem, index) {
  console.log('elements #' + index);
  console.dir(elem);
});

console.log(users.length);

users.splice(1, 0, {name:'afterschool', age:24});

console.dir(users);

users.splice(2,1);
console.dir(users);
