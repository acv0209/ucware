console.log('argv attribute parameters : ' + process.argv.length);
console.dir(process.argv.length);

process.argv.forEach(function(item, index) {
  console.log(index + ' : ' + index);
});
