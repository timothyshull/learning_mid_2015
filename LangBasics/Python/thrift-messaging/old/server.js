var thrift = require("thrift");
var RpcMessage = require("./gen-nodejs/RpcMessage");
var messageTypes = require("./gen-nodejs/message_types");

var data = {};

var server = thrift.createServer(RpcMessage, {
  ping: function(result) {
    console.log("ping()");
    result(null);
  },

  clientMsg: function(msg) {
    console.log("Key: " + msg.type);
    console.log("Data: " + msg.data);
    result(null);
  },

  zip: function() {
    console.log("zip()");
    result(null);
  }

}, {});

server.listen(9090);