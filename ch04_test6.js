var fs = require('fs');

fs.readFile('./package.json', 'utf8', function() {
  console.log(data);
});
