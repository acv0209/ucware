
var output = 'hello!';
var buffer1 = new Buffer(10);
var len = buffer1.write(output, 'utf8');
console.log('buffer length : ' + len);
console.log('first buffer strings : ' + buffer1.toString());
console.log('buffer flag : ' + Buffer.isBuffer(buffer1));

var byteLen = Buffer.byteLength(buffer1);
console.log('byteLen : ' + byteLen);

var str1 = buffer1.toString('utf8', 0, 6);
console.log('str1 : ' + str1);

var buffer2 = Buffer.from('Hello', 'utf8');
console.log('second buffer length : ' + Buffer.byteLength(buffer2));

var str2 = buffer2.toString('utf8', 0, Buffer.byteLength(buffer2));
console.log('str2 : ' + str2);
