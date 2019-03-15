var fs = require('fs');
fs.writeFile('./output.txt', 'Hello.', function(err) {
  if (err) {
    console.log('error occured. ');
    console.dir(err);
  }

  console.log('output.txt written complete');
});
