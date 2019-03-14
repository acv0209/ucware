var users = [{name: 'generation', age:20}, {name: 'girlsday', age:22}];
console.log('numbers of array : ' + users.length);

users.push({name:'tara', age:21});
console.log('numbers of array : ' + users.length);

var elem = users.pop();
console.log('numbers of array : ' + users.length);

console.dir(elem);
