var users = [{name: 'generation', age:20}, {name: 'girlsday', age:22}];
console.log('numbers of array : ' + users.length);

users.unshift({name:'tara', age:21});
console.log('numbers of array : ' + users.length);

console.dir(users);

var elem = users.pop();
console.log('numbers of array : ' + users.length);

console.dir(elem);
