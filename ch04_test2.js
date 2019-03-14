process.on('exit', function() {
  console.log('exit event occured...');
});

setTimeout(function() {
  console.log('after 2 minutes.');
  process.exit();
}, 2000);
