var net = require('net');
var server = net.createServer(function(socket) {
  // The socket has been opened
  console.log('Somebody connected');

  // Events
  socket.on('connect', function(){
    // This Code will be run when a new connection is opened
  });
  socket.on('data', function(data){
    // Code here will be run when some data arrives
  });
  socket.on('end', function() {
    // Code here will be run when the socket closes
  });
});

// Start the server listening
server.listen(5432, function(){
  console.log('Server listening on port: ' + 5432);
});