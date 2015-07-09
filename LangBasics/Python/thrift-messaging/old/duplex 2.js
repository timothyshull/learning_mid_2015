var thrift = require('thrift');
var ThriftTransports = require('./node_modules/thrift/lib/thrift/transport');
var ThriftProtocols = require('./node_modules/thrift/lib/thrift/protocol');
var RpcMessage = require('./gen-nodejs/RpcMessage');
var messageTypes = require('./gen-nodejs/message_types');

var spawn = require('child_process').spawn;
var fs = require('fs');
var BUFSIZE=256;
var buf = new Buffer(BUFSIZE);
var bytesRead;

transport = ThriftTransports.TBufferedTransport()
protocol = ThriftProtocols.TBinaryProtocol()

var connection = thrift.createConnection("localhost", {path: '/tmp/thrift.sock'}, {
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

msg1.type = "cmd";
msg1.data = "read -p Prompt:  test";

client.clientMsg(msg1, function(err, message) {
    console.log("Inside callback");
  if (err) {
    console.log("InvalidOperation " + err);
  } else {
    console.log('Whoa? You know how to divide by zero?');
  }
  connection.end();
});



var data = {};

var server = thrift.createServer(RpcMessage, {
  ping: function(result) {
    console.log("ping()");
    result(null);
  },

  clientMsg: function(msg) {
      child = spawn(msg.data);
      
      child.stdout.on('data', function (data) {
          console.log(data.toString());
      });
    console.log("Key: " + msg.type);
    console.log("Data: " + msg.data);
    result(null);
  },

  zip: function() {
    console.log("zip()");
    result(null);
  }

}, {});

server.listen(9091, function (conn) {
    console.log("Listening...");
});

// while (true) { // Loop as long as stdin input is available.
//     bytesRead = 0;
//     try {
//         bytesRead = fs.readSync(process.stdin.fd, buf, 0, BUFSIZE);
//     } catch (e) {
//         if (e.code === 'EAGAIN') { // 'resource temporarily unavailable'
//             // Happens on OS X 10.8.3 (not Windows 7!), if there's no
//             // stdin input - typically when invoking a script without any
//             // input (for interactive stdin input).
//             // If you were to just continue, you'd create a tight loop.
//             console.error('ERROR: interactive stdin input not supported.');
//             process.exit(1);
//         } else if (e.code === 'EOF') {
//             // Happens on Windows 7, but not OS X 10.8.3:
//             // simply signals the end of *piped* stdin input.
//             break;
//         }
//         throw e; // unexpected exception
//     }
//     if (bytesRead === 0) {
//         // No more stdin input available.
//         // OS X 10.8.3: regardless of input method, this is how the end
//         //   of input is signaled.
//         // Windows 7: this is how the end of input is signaled for
//         //   *interactive* stdin input.
//         break;
//     }
//   // Process the chunk read.
//   console.log('Bytes read: %s; content:\n%s', bytesRead, buf.toString(null, 0, bytesRead));
// }