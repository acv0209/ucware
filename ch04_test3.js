process.on('tick', function(count) {
  console.log('tick event occured : ' + count);
});

setTimeout(function() {
  console.log('executed after 2 seconds');

  process.emit('tick', '2');
}, 2000);
