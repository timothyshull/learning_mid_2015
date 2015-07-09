var thrift = require('thrift');
var ThriftTransports = require('./node_modules/thrift/lib/thrift/transport');
var ThriftProtocols = require('./node_modules/thrift/lib/thrift/protocol');
var RpcMessage = require('./gen-nodejs/RpcMessage');
var messageTypes = require('./gen-nodejs/message_types');

transport = ThriftTransports.TBufferedTransport()
protocol = ThriftProtocols.TBinaryProtocol()

var connection = thrift.createConnection("localhost", 9090, {
  transport : transport,
  protocol : protocol
});

connection.on('error', function(err) {
  // assert(false, err);
  // console.log(err);
});

// Create a Calculator client with the connection
var client = thrift.createClient(RpcMessage, connection);

client.ping(function(err, response) {
  console.log('ping()');
});

msg1 = new messageTypes.Message();
console.dir(msg1);
msg1.type = "cmd";
msg1.data = "pwd";

console.dir(msg1);

client.clientMsg(msg1, function(err, message) {
    console.log("Inside callback");
  if (err) {
    console.log("InvalidOperation " + err);
  } else {
    console.log('Whoa? You know how to divide by zero?');
  }
  connection.end();
});

// msg.type = "15";
// msg.data = "10";
//
// client.xferMsg(msg, function(err, message) {
//
//   //close the connection once we're done
//   connection.end();
// });