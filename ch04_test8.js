var fs = require('fs');

fs.open('./output.txt', 'w', function(err, fd) {
  if (err) {
    console.log('open error');
    console.dir(err);
    return;
  }

  var buf = new Buffer('Hello\n');
  fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer) {
    if (err) {
      console.log('write error');
      console.dir(err);
      return;
    }

    console.log('write complete');

    fs.close(fd, function() {
      console.log('close complete');
    });
  });
});
