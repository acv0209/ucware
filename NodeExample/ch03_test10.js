var users = [
  {name:'generation', age:20},
  {name:'girlsday', age:22},
  {name:'tara', age:21}
];

for (var i = 0; i < users.length; i++) {
  console.log('elements #' + i + " : " + users[i].name);
} //for

users.forEach(function(elem, index) {
    console.log('elements #' + i + " : " + elem.name);
});
